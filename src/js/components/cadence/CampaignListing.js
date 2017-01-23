import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class CampaignListing extends React.Component {
  constructor(props) {
    super(props);
    this.handleRenderCampaign = this.handleRenderCampaign.bind(this);
    this.handleDeleteCampaign = this.handleDeleteCampaign.bind(this);
  }

  // RENDERS THE SELECTED CAMPAIGN
  handleRenderCampaign = (e) => {
    this.props.renderCampaign(e);
  }

  // DELETES THE SELECTED CAMPAIGN
  handleDeleteCampaign = (e) => {
    this.props.deleteCampaign(e.target.id);
  }

  render(){
    const running = <small class="running" id={this.props.campaignID} onClick={this.handleRenderCampaign}>(Running)</small>;
    const paused = <small class="running red" id={this.props.campaignID} onClick={this.handleRenderCampaign}>(Paused)</small>;

    return(
      <div id={this.props.campaignID} onClick={this.handleRenderCampaign} class="sixteen campaignListing gray">
        <div id={this.props.campaignID} class="text-left inline-block full-width" onClick={this.handleRenderCampaign}>
          { this.props.campaignName } { this.props.campaignStatus ? running : paused }
          <span id={this.props.campaignID} onClick={this.handleDeleteCampaign} class="text-right">&times;</span>
        </div>
      </div>
    )
  }
}
