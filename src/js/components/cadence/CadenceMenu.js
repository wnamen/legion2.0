import React, { Component } from "react"
import { Button, Tabs } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import CampaignMenu from "./CampaignMenu"
import TemplateMenu from "./TemplateMenu"

export default class CadenceMenu extends React.Component {
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
        New Campaign Button here
        <CampaignMenu />
        <TemplateMenu />
        Create button here
      </div>
    )
  }
}
