import React, { Component } from "react"
import { Input, Dropdown, Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import ConfigurationForm from "./ConfigurationForm"

export default class EmailConfiguration extends React.Component {
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
      <div class="sixteen columns lgbufferMargin">
        <h5 class="settingsSubTitles">Email Configuration</h5>
        <ConfigurationForm />
        <div class="btnContainer five columns offset-by-two">
          <div class="lgnBtn settingsBtn smoothBkgd electric-blue-background white">Save</div>
          <div class="lgnBtn settingsBtn smoothBkgd white-background small-border gray-border">Remove</div>
        </div>
        
      </div>
    )
  }
}
