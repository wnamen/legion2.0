import React from "react";
import { Input } from "react-materialize";

import MapResults from "./MapResults";

export default class MapTable extends React.Component {
  render(){
    let column_count;
    let contacts = this.props.contacts.map((contact, i) => {
      column_count = Object.keys(contact).length;
      return (
        <MapResults key={contact.id} name={contact.name} jobTitle={contact.jobTitle} company={contact.company} employees={contact.employees} industry={contact.industry} city={contact.city} phone={contact.phone} email={contact.email} age={contact.age} education={contact.education} interests={contact.interests}/>
      )
    })

    let columnHead = [];
    for (var i = 0; i < column_count - 1; i++) {
      columnHead.push(
        <th key={i}>
          <Input class="map-head-cell black" type='select'>
            <option value="name">Name</option>
            <option value="jobTitle">Job Title</option>
            <option value="age">Age</option>
            <option value="education">Education</option>
            <option value="interests">Interests</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="linkedin">Linkedin</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="crunchbase">Crunchbase</option>
            <option value="homePage">Home Page</option>
            <option value="company">Company</option>
            <option value="industry">Industry</option>
            <option value="revenue">Revenue</option>
            <option value="funding">Funding</option>
            <option value="companySize">Company Size</option>
            <option value="companyPhone">Company Phone</option>
            <option value="companyLinkedin">Company Linkedin</option>
            <option value="companyTwitter">Company Twitter</option>
            <option value="companyHomePage">Company Home</option>
          </Input>
        </th>
      )
    }
    return(
      <div class="sixteen columns" style={{"overflow":"auto"}}>
        <table id="map-table" class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <thead>
            <tr>
              { columnHead }
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
