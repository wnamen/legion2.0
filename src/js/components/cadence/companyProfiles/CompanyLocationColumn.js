import React, { Component } from "react"
import $ from "jquery"

import CompanyInfo from "./CompanyInfo"
import LocationInfo from "./LocationInfo"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class CompanyLocationColumn extends React.Component {
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
      <div class="four columns offset-by-one-half smScreenWhiteCard">
        <CompanyInfo />
        <LocationInfo />
      </div>
    )
  }
}
