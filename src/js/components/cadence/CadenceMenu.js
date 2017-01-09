import React, { Component } from "react"
import { Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import CampaignMenu from "./CampaignMenu"
import TemplateMenu from "./TemplateMenu"

export default class CadenceMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
      currentView: "campaigns"
    }
    this.renderCampaigns = this.renderCampaigns.bind(this);
    this.renderTemplates = this.renderTemplates.bind(this);
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT
  renderCampaigns = () => {
    this.setState({currentView: "campaigns"});
  }

  renderTemplates = () => {
    this.setState({currentView: "templates"});
  }

  render(){
    //RENDER LOGIC HERE
    let current_view = this.state.currentView;

    return(
      <div class="four columns offset-by-one-half">
        <div class="profile-card whiteCard cadenceMenu">
          <div class="lgnBtn smoothBkgd electric-blue-background electric-blue-border white lgnBtnUp newCampaignBtn">New Campaign (20 Credits)</div>
          <div class="cadenceToggleContainer">
            <a onClick={this.renderCampaigns} class="cadenceToggle text-left medium-bottom-border electric-blue-border gray">Campaigns</a>
            <a onClick={this.renderTemplates} class="cadenceToggle text-right gray">Templates</a>
          </div>
          <hr class="no-margin"></hr>
          { current_view === "campaigns" ? <CampaignMenu /> : <TemplateMenu /> }
          <a class="cadenceToggle newBtnBuffer">Create New Campaign</a>
        </div>
      </div>
    )
  }
}
