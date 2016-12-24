import React, { Component } from "react"
import $ from "jquery"

import ContactInfo from "./ContactInfo"
import LocationInfo from "./LocationInfo"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class ContantLocationColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render(){
    //RENDER LOGIC HERE

    return(
      <div class="four columns">
        <h5>This is the contact/location column</h5>
        HTML CODE IS IMPORTED FROM COLUMN COMPONENTS
        <ContactInfo />
        <LocationInfo />
      </div>
    )
  }
}
