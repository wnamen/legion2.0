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
      currentView: "campaigns"
    }
    this.renderSelectedMenu = this.renderSelectedMenu.bind(this);
  }

  // HANDLES TOGGLING BETWEEN MENUS
  renderSelectedMenu = () => {
    this.state.currentView === "campaigns" ? this.setState({currentView: "templates"}) : this.setState({currentView: "campaigns"});
  }

  render(){
    let current_view = this.state.currentView;

    const createCampaign = <a class="cadenceToggle newBtnBuffer" onClick={this.props.createNewCampaign}>Create New Campaign</a>;
    const createTemplate = <a class="cadenceToggle newBtnBuffer" onClick={this.props.createNewTemplate}>Create New Template</a>;
    const activeCampaign = <a onClick={this.renderSelectedMenu} class="cadenceToggle text-left medium-bottom-border electric-blue-border gray">Campaigns</a>;
    const unactiveCampaign = <a onClick={this.renderSelectedMenu} class="cadenceToggle text-left gray">Campaigns</a>;
    const activeTemplate = <a onClick={this.renderSelectedMenu} class="cadenceToggle text-right medium-bottom-border electric-blue-border gray">Templates</a>;
    const unactiveTemplate = <a onClick={this.renderSelectedMenu} class="cadenceToggle text-right gray">Templates</a>;

    return(
      <div class="four columns offset-by-one-half">
        <div class="profile-card whiteCard cadenceMenu">
          <div class="lgnBtn smoothBkgd electric-blue-background electric-blue-border white lgnBtnUp newCampaignBtn" onClick={this.props.createNewCampaign}>New Campaign (20 Credits)</div>
          <div class="cadenceToggleContainer">
            { current_view === "campaigns" ? activeCampaign : unactiveCampaign }
            { current_view === "templates" ? activeTemplate : unactiveTemplate }
          </div>
          <hr class="no-margin"></hr>
          { current_view === "campaigns" ? <CampaignMenu cadenceData={this.props.cadenceData} renderCampaign={this.props.renderCampaign}/> : <TemplateMenu templateData={this.props.templateData}  renderTemplate={this.props.renderTemplate} deleteTemplate={this.props.deleteTemplate}/> }
          { current_view === "campaigns" ? createCampaign : createTemplate }
        </div>
      </div>
    )
  }
}
