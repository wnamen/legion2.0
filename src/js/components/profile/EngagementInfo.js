import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class EngagementInfo extends React.Component {
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
      <div class="profile-card engagement">
        <h6 class="black">Engagement</h6>
        <div class="activityAction">
          <div class="actionIcon red-background"></div>
          <p class="activityDetails gray">- Clicked <strong>Follow-up from our meeting</strong> on <strong>12/07 @ 5:47pm PST</strong></p>
        </div>
        <br></br>
        <div class="activityAction">
          <div class="actionIcon electric-blue-background"></div>
          <p class="activityDetails gray">- Opened <strong>Follow-up from our meeting</strong> on <strong>12/07 @ 5:47pm PST</strong></p>
        </div>
        <br></br>
        <div class="activityAction">
          <div class="actionIcon red-background"></div>
          <p class="activityDetails gray">- Clicked <strong>Follow-up from our meeting</strong> on <strong>12/07 @ 5:47pm PST</strong></p>
        </div>
        <br></br>
        <div class="activityAction">
          <div class="actionIcon electric-blue-background"></div>
          <p class="activityDetails gray">- Opened <strong>Follow-up from our meeting</strong> on <strong>12/07 @ 5:47pm PST</strong></p>
        </div>
        <br></br>
        <div class="activityAction">
          <div class="actionIcon red-background"></div>
          <p class="activityDetails gray">- Clicked <strong>Follow-up from our meeting</strong> on <strong>12/07 @ 5:47pm PST</strong></p>
        </div>
        <br></br>
      </div>
    )
  }
}
