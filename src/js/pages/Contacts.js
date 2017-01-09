import React from "react";
import { Link } from "react-router";

// import ContactResults from "../components/contacts/ContactResults"
import ContactsBar from "../components/contacts/ContactsBar";
// import ContactsTable from "../components/contacts/ContactsTable";
import MapBar from "../components/contacts/MapBar";
import MapTable from "../components/contacts/MapTable";
import MapResults from "../components/contacts/MapResults";


export default class Contacts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mapping: true,
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
