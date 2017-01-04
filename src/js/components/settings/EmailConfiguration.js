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
      <div class="sixteen columns">
        EmailConfiguration Input Select Dropdown here
        <ConfigurationForm />
        EmailConfiguration buttons here
      </div>
    )
  }
}
