import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class CampaignEngagement extends React.Component {
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
      <div class="three columns">
          <div class="profile-card engagement">
          <h6 class="black">Engagement</h6>
          <div class="activityAction">
            <div class="actionIcon red-background"></div>
            <p class="activityDetails gray">
              <a href="#" class="active electric-blue">Kevin Hale </a>
              <strong>Clicked</strong> Follow-up on 12/07 @ 5:47pm PST
            </p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails gray">
              <a href="#" class="active electric-blue">Jamasen Rodriguez </a>
              <strong>Opened</strong> Follow-up on 12/05 @ 12:04pm PST
            </p>
          </div>
          <br></br>
          <div class="activityAction">
            <div class="actionIcon electric-blue-background"></div>
            <p class="activityDetails gray">
              <a href="#" class="active electric-blue">Jamasen Rodriguez </a>
              <strong>Opened</strong> Re: Checking in with Legion on 12/03 @ 8:12am PST
            </p>
          </div>
        </div>
      </div>
    )
  }
}
