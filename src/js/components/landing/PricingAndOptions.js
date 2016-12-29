import React, { Component } from "react"
import $ from "jquery"

import PayAsYouGo from "./payasyougo/PayAsYouGo"
import Premium from "./premium/Premium"
import Standard from "./standard/Standard"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class PricingAndOptions extends React.Component {
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
      <div class="sixteen columns">
        <h5>This is the PricingAndOptions Component</h5>
        HTML CODE IS IMPORTED FROM CHILD COMPONENTS
        <PayAsYouGo />
        <Standard />
        <Premium />
      </div>
    )
  }
}