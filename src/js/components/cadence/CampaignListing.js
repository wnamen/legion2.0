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
    console.log(this.props);
    const running = <small class="running">(Running)</small>;
    const paused = <small class="running red">(Paused)</small>;

    return(
      <div class="sixteen campaignListing gray">
        <div id={this.props.campaignID} class="text-left inline-block full-width">
          { this.props.campaignName } { this.props.campaignStatus ? running : paused }
          <span class="text-right">&times;</span>
        </div>
      </div>
    )
  }
}
