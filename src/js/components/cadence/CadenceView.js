import React, { Component } from "react"
import { Dropdown, Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import TemplateForm from "./TemplateForm"

export default class CadenceView extends React.Component {
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
      <div class="eight columns">
        View title and Button here
        <TemplateForm />
      </div>
    )
  }
}
