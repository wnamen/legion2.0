import React from "react"
import CSSModules from 'react-css-modules'
// import Styles from "./nav.css"

import ContactResults from "./ContactResults"

export default class ContactsTable extends React.Component {
  render(){
    let contacts = this.props.contacts.map((contact, i) => {
      return (
        <ContactResults key={i} name={contact.name} jobTitle={contact.jobTitle} company={contact.company} employees={contact.employees} industry={contact.industry} city={contact.city}/>
      )
    })
    return(
      <div class="twelve columns">
        <table>
          <thead>
            <tr>
              <th data-field="name">NAME</th>
              <th data-field="jobTitle">JOB TITLE</th>
              <th data-field="company">COMPANY</th>
              <th data-field="employees">EMPLOYEES</th>
              <th data-field="industry">INDUSTRY</th>
              <th data-field="city">CITY</th>
            </tr>
          </thead>

          <tbody>
            {contacts}
          </tbody>
        </table>
      </div>
    )
  }
}
