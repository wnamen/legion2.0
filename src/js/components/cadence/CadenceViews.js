import React, { Component } from "react"
import { Dropdown, Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import TemplatesView from "./TemplatesView"
import NoTemplatesView from "./NoTemplatesView"

export default class CadenceViews extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let current_view = this.props.currentView;

    console.log(this.props);
    return(
      <div class="eight columns">
        <div class="profile-card whiteCard campaignEditorCard">
          { current_view !== null ? <TemplatesView renderState={this.props.renderState} disableSave={this.props.disableSave} currentView={this.props.currentView} currentTemplates={this.props.currentTemplates} currentDelays={this.props.currentDelays} templateData={this.props.templateData} campaignTemplateList={this.props.campaignTemplateList} saveTemplate={this.props.saveTemplate} saveCampaign={this.props.saveCampaign}/> : <NoTemplatesView /> }
        </div>
      </div>
    )
  }
}
