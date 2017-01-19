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

    console.log(current_view);
    return(
      <div class="eight columns">
        <div class="profile-card whiteCard campaignEditorCard">
          { current_view !== null ? <TemplatesView currentView={this.props.currentView} currentTemplates={this.props.currentTemplates} templateData={this.props.templateData} saveTemplate={this.props.saveTemplate}/> : <NoTemplatesView /> }
        </div>
      </div>
    )
  }
}
