import React, { Component } from "react"
import { Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import CampaignListing from "./CampaignListing"

export default class CampaignMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let data = this.props.cadenceData;
    let cadences;

    // RENDERS A SINGLE CAMPAIGN LISTING
    if (data !== undefined) {
      cadences = data.map((cadence, index) => {
        return (
          <CampaignListing key={index} campaignID={cadence.id} campaignName={cadence.name} campaignStatus={cadence.started} renderCampaign={this.props.renderCampaign}/>
        )
      })
    }


    return(
      <div class="sixteen text-left menu-container">
        { cadences }
      </div>
    )
  }
}
