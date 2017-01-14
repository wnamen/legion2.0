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
        <div class="planOptions standardAdjust">
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails"><strong>Everything in Pay-As-You-Go</strong></p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Unlimited Search Results/Month</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Unlimited Uploaded Contacts Limit</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Create Unlimited Lists</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Unlimited Touches per Campaign</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">5 Connected Email Account</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Live Campaign Activity Stream</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Advanced Search Filters</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Export CSV</p>
          </div>
        </div>
      </div>
    )
  }
}
