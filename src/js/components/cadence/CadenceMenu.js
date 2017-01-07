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
      <div class="four columns">
        New Campaign Button here
        <div>
          <a onClick={this.renderCampaigns}>Campaigns</a>
          <a onClick={this.renderTemplates}>Templates</a>
        </div>
        { current_view === "campaigns" ? <CampaignMenu /> : <TemplateMenu /> }
        Create button here
      </div>
    )
  }
}
