import React            from "react";
import { Link }         from "react-router";
import cookie           from "react-cookie";
import { CubeGrid }     from "better-react-spinkit";
import $                from "jquery";

// import ContactResults from "../components/contacts/ContactResults"
import ContactsBar      from "../components/contacts/ContactsBar";
import ContactsTable    from "../components/contacts/ContactsTable";
import MapBar           from "../components/contacts/MapBar";
import MapTable         from "../components/contacts/MapTable";
import MapResults       from "../components/contacts/MapResults";

export default class Contacts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      token: cookie.load("token"),
      isSelected: false,
      loading: false,
      mapping: false,
      results: [],
      tmLists: [],
      defaultListView: "All My Contacts",
      contacts: [
        {
          id:1865,
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco',
          phone:'(904) 314-6488',
          email:'williamjosephnamen@gmail.com',
          education:'University of North Florida',
          age: 24,
          interests:'Sailing'
        },
        {
          id:75675,
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco',
          phone:'(904) 314-6488',
          email:'williamjosephnamen@gmail.com',
          education:'University of North Florida',
          age: 24,
          interests:'Sailing'
        },
        {
          id:342564,
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco',
          phone:'(904) 314-6488',
          email:'williamjosephnamen@gmail.com',
          education:'University of North Florida',
          age: 24,
          interests:'Sailing'
        },
        {
          id:421313,
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco',
          phone:'(904) 314-6488',
          email:'williamjosephnamen@gmail.com',
          education:'University of North Florida',
          age: 24,
          interests:'Sailing'
        },
        {
          id:3425,
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco',
          phone:'(904) 314-6488',
          email:'williamjosephnamen@gmail.com',
          education:'University of North Florida',
          age: 24,
          interests:'Sailing'
        },
        {
          id:6543534,
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco',
          phone:'(904) 314-6488',
          email:'williamjosephnamen@gmail.com',
          education:'University of North Florida',
          age: 24,
          interests:'Sailing'
        }
      ]
    }
    this.updateMappingStatus = this.updateMappingStatus.bind(this);
    this.changeListView = this.changeListView.bind(this);
    this.getNewListView = this.getNewListView.bind(this);
    this.captureSelected = this.captureSelected.bind(this);
    this.loadInitialListView = this.loadInitialListView.bind(this);
    this.loadAvailableLists = this.loadAvailableLists.bind(this);
  }

  componentWillMount = () =>{
    this.setState({loading:true});
    this.loadAvailableLists();
  }

  loadAvailableLists = () => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url:'https://legionv2-api.us-west-2.elasticbeanstalk.com/tm-list/?page_size=1000',
      headers: {"Authorization": tokenHeader },
      dataType:'json',
      crossDomain: true,
      cache:false,
      success:function(response){
        console.log(response);
        this.loadInitialListView(response.results);
        this.setState({
          tmLists:response.results
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  loadInitialListView = (lists) => {
    lists.forEach((list) => {
      if (list.name === this.state.defaultListView) {
        let tokenHeader = `Token ${this.state.token}`;

        $.get({
          url:`https://legionv2-api.us-west-2.elasticbeanstalk.com/contacts/${list.id}/?page_size=50`,
          headers: {"Authorization": tokenHeader },
          dataType:'json',
          crossDomain: true,
          cache:false,
          success:function(results){
            console.log(results);
            this.setState({
              results:results,
              loading: false
            });
          }.bind(this),
          error:function(xhr, status, err){
          }.bind(this)
        });
      }
    });
  }

  getNewListView = (listID) => {
    this.setState({loading:true});
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url:`https://legionv2-api.us-west-2.elasticbeanstalk.com/contacts/${listID}/?page_size=50`,
      headers: {"Authorization": tokenHeader },
      dataType:'json',
      crossDomain: true,
      cache:false,
      success:function(results){
        this.setState({
          results:results,
          loading: false
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  updateMappingStatus = () => {
    this.setState({mapping: !this.state.mapping})
  }

  changeListView = (selectedList) => {
    this.state.tmLists.forEach((list) => {
      if (list.name === selectedList) {
        this.getNewListView(list.id);
      }
    });
  }

  captureSelected = (data) => {
    console.log(data);
    // this.setState({isSelected: true});
  }

  render() {

    let currentView;
    if (this.state.mapping) {
      currentView = (
        <div class="sixteen columns">
          <MapBar mapping={this.state.mapping} updateMappingStatus={this.updateMappingStatus}/>
          <MapTable contacts={this.state.contacts}/>
          <MapResults />
        </div>
      )
    } else {
      currentView = (
        <div class="sixteen columns">
          <ContactsBar resultsCount={this.state.results.count} lists={this.state.tmLists} onNewListView={this.changeListView} isSelected={this.state.isSelected} loadAvailableLists={this.loadAvailableLists} mapping={this.state.mapping} updateMappingStatus={this.updateMappingStatus} />
            { this.state.loading ?
              <div class="sixteen columns"><div id="loaderContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding"><CubeGrid size={50} color="#36b7ea" /></div></div> :
              <ContactsTable results={this.state.results} captureSelected={this.captureSelected} />
            }
        </div>
      )
    }

    return (
        <div class="page-container gray-light-background">
          <div class="sixteen columns">
            { currentView }
          </div>
        </div>

    );
  }
}

// <ContactsTable />
// <ContactResults contacts={this.state.contacts}/>
