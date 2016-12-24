import React from "react";
import { Link } from "react-router";

// import ContactResults from "../components/contacts/ContactResults"
// import ContactsBar from "../components/contacts/ContactsBar"
// import ContactsTable from "../components/contacts/ContactsTable"

export default class Contacts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      contacts: [
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        }
      ]
    }
  }

  render() {
    return (
        <div class="container gray-light-background">
          <div class="sixteen columns">
            <h3>My Contacts</h3>
          </div>
        </div>

    );
  }
}


// <ContactsBar />
// <ContactsTable />
// <ContactResults contacts={this.state.contacts}/>
