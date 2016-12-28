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
      <div class="three columns offset-by-one-half">
        <ContactInfo />
        <LocationInfo />
      </div>
    )
  }
}
