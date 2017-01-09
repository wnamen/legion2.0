import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class CampaignListing extends React.Component {
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
      <div class="sixteen campaignListing gray">
        <div class="text-left inline-block full-width">
          My First Campaign <small class="running">(running)</small>
          <span class="text-right">&times;</span>
        </div>
      </div>
    )
  }
}
