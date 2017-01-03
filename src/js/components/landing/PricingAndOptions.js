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
      <div class="sixteen columns white-background">
        <h6 class="fH6 pH6 gray text-center">Grow Faster with Legion Analytics</h6>
        <PayAsYouGo />
        <Standard />
        <Premium />
      </div>
    )
  }
}
