import React, { Component } from "react"
import $ from "jquery"

import Pricing from "./Pricing"
import Options from "./Options"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Standard extends React.Component {
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
        <h5>This is the Standard Component</h5>
        HTML CODE IS IMPORTED FROM CHILD COMPONENTS
        <Pricing />
        <Options />
      </div>
    )
  }
}
