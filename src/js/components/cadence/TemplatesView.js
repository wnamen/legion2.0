import React, { Component } from "react";
import { Input, Button, Dropdown } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import TemplateGenerator from "./TemplateGenerator";
import TemplateViewHeader from "./TemplateViewHeader";
import Template from "./Template";

export default class TemplateViews extends React.Component {
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
      <div class="sixteen">
        <TemplateViewHeader />
        <Template />
        <TemplateGenerator />
      </div>
    )
  }
}
