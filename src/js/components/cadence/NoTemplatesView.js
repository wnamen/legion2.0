import React, { Component } from "react"
import { Input, Button, Dropdown } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class NoTemplatesView extends React.Component {
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
      <div class="sixteen text-center">
        <img src="/src/img/campaign_illustration.png" class="emptyCampaignView"></img>
        <div class="emptyCampaignText electric-blue">Get more customers with effective email campaigns!</div>
      </div>
    )
  }
}
