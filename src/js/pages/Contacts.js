import React from "react";
import { Link } from "react-router";
import { CubeGrid } from "better-react-spinkit"

// import ContactResults from "../components/contacts/ContactResults"
import ContactsBar from "../components/contacts/ContactsBar";
import ContactsTable from "../components/contacts/ContactsTable";
import MapBar from "../components/contacts/MapBar";
import MapTable from "../components/contacts/MapTable";
import MapResults from "../components/contacts/MapResults";


export default class Contacts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
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
    this.isMapping = this.isMapping.bind(this);
  }

  componentWillMount(){
    this.setState({loading:true});

    $.ajax({
      url:'https://apidev.legionanalytics.com/api/people/?format=json&page_size=50',
      dataType:'json',
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

  isMapping() {
    if (this.state.mapping) {
      return (
        <div class="sixteen columns">
          <MapBar />
          <MapTable contacts={this.state.contacts}/>
          <MapResults />
        </div>
      )
    } else {
      return (
        <div class="sixteen columns">
          <ContactsBar />
            { this.state.loading ?
              <div class="sixteen columns"><div id="loaderContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding"><CubeGrid size={50} color="#36b7ea" /></div></div> :
              <ContactsTable results={this.state.results} />
            }
        </div>
      )
    }
  }

  render() {
    return (
        <div class="page-container gray-light-background">
          <div class="sixteen columns">
            { this.isMapping() }
          </div>
        </div>

    );
  }
}

// <ContactsTable />
// <ContactResults contacts={this.state.contacts}/>
