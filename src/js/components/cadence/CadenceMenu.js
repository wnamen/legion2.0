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

    const createCampaign = <a class="cadenceToggle newBtnBuffer">Create New Campaign</a>;
    const createTemplate = <a class="cadenceToggle newBtnBuffer">Create New Template</a>;
    const activeCampaign = <a onClick={this.renderCampaigns} class="cadenceToggle text-left medium-bottom-border electric-blue-border gray">Campaigns</a>;
    const unactiveCampaign = <a onClick={this.renderCampaigns} class="cadenceToggle text-left gray">Campaigns</a>;
    const activeTemplate = <a onClick={this.renderTemplates} class="cadenceToggle text-right medium-bottom-border electric-blue-border gray">Templates</a>;
    const unactiveTemplate = <a onClick={this.renderTemplates} class="cadenceToggle text-right gray">Templates</a>;

    return(
      <div class="four columns offset-by-one-half">
        <div class="profile-card whiteCard cadenceMenu">
          <div class="lgnBtn smoothBkgd electric-blue-background electric-blue-border white lgnBtnUp newCampaignBtn">New Campaign (20 Credits)</div>
          <div class="cadenceToggleContainer">
            { current_view === "campaigns" ? activeCampaign : unactiveCampaign }
            { current_view === "templates" ? activeTemplate : unactiveTemplate }
          </div>
          <hr class="no-margin"></hr>
          { current_view === "campaigns" ? <CampaignMenu /> : <TemplateMenu /> }
          { current_view === "campaigns" ? createCampaign : createTemplate }
        </div>
      </div>
    )
  }
}
