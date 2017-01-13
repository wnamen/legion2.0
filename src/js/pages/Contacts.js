import React            from "react";
import { Link }         from "react-router";
import cookie           from "react-cookie";
import { CubeGrid }     from "better-react-spinkit"

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
      loading: false,
      mapping: false,
      results: "",
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
  }

  componentWillMount = () =>{
    this.setState({loading:true});
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url:'https://legionv2-api.us-west-2.elasticbeanstalk.com/tm-list/?page_size=1000',
      headers: {"Authorization": tokenHeader },
      dataType:'json',
      crossDomain: true,
      cache:false,
      success:function(results){
        this.setState({
          tmLists:results,
          loading: false
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });

    $.get({
      url:'https://legionv2-api.us-west-2.elasticbeanstalk.com/tm-list/?page_size=1000',
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

  render() {
    console.log(this.state.mapping);

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
          <ContactsBar mapping={this.state.mapping} updateMappingStatus={this.updateMappingStatus} />
            { this.state.loading ?
              <div class="sixteen columns"><div id="loaderContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding"><CubeGrid size={50} color="#36b7ea" /></div></div> :
              <ContactsTable results={this.state.results} />
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
