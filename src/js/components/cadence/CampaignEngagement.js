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

  exportToLists = () => {
    this.props.exportToLists(this.props.currentView.id);
  }

  render(){
    let engagements = this.props.engagementData;
    let mappedEngagments;
    console.log(engagements);

    if (engagements !== undefined) {
      mappedEngagments = engagements.map((engagement, index) => {

        let year = ((engagement.date.split("-"))[0]).slice(2);
        let month = (engagement.date.split("-"))[1];
        let hour = (engagement.date.slice(engagement.date.indexOf("T")+1)).split(":")[0];
        let minute = (engagement.date.slice(engagement.date.indexOf("T")+1)).split(":")[1];
        let meridiem = "am";

        if (parseInt(hour) > 12) {
          hour = (parseInt(hour) - 12);
          meridiem = "pm"
        }

        return (
          <div>
            <div key={index} class="activityAction">
              <div class="actionIcon electric-blue-background"></div>
              <p class="activityDetails gray">
                <a class="active electric-blue">{engagement.person.name} </a>
                <strong>{(engagement.type_of_visit).charAt(0).toUpperCase() + (engagement.type_of_visit).slice(1)}</strong> {engagement.subject} on {year}/{month} @ {hour}:{minute} {meridiem}
              </p>
            </div>
            <br></br>
          </div>
        )
      })
    }

    return(
      <div class="three columns">
        <div class="profile-card engagement">
          <h6 class="black">Engagement<li><a class="contact-upload" onClick={this.exportToLists}>Export to lists</a></li></h6>
          {mappedEngagments}
        </div>
      </div>
    )
  }
}
