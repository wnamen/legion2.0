import React, { Component } from "react"
import $ from "jquery"

import CallToAction from "./CallToAction"
import Features from "./Features"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Header extends React.Component {
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
        <h5>This is the Header Component</h5>
        HTML CODE IS IMPORTED FROM CHILD COMPONENTS
        <CallToAction />
        <Features />
      </div>
    )
  }
}
