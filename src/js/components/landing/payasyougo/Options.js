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
            <p class="activityDetails pricingDetails"><strong>$100 in Credit on Sign Up</strong></p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">500 Search Queries/Month</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">50,000 Search Results/Month</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">10,000 Uploaded Contacts Limit</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Create a Maximum of 15 Lists</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Maximum 5 Touches per Campaign</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">1 Connected Email Account</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Limited Campaign Activity Stream</p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails pricingDetails gray">Basic Search Filters</p>
          </div>
        </div>

      </div>
    )
  }
}
