import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Options extends React.Component {
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
      <div class="sixteen columns optionCont">
        <div class="planOptions">
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails"><strong>Everything in Standard</strong></p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">10 Connected Email Accounts</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray"><em>Kylie.ai Features</em></p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray"><em>Unlimited Drafts</em></p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray"><em>Autopilot</em></p>
          </div>
        </div>
      </div>
    )
  }
}
