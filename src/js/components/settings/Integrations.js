import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Integrations extends React.Component {
  constructor(props) {
    super(props);

    this.handleOutlookIntegration = this.handleOutlookIntegration.bind(this);
    this.handleGmailIntegration = this.handleGmailIntegration.bind(this);
  }

  handleGmailIntegration = (e) => {
    e.preventDefault();
  }

  handleOutlookIntegration = (e) => {
    e.preventDefault();
  }

  render(){

    return(
      <div class="sixteen columns lgbufferMargin">
        <h5 class="settingsSubTitles">Integrations</h5>
        <div class="thirteen columns offset-by-one small-border gray-border integrationRow">
          <img class="integrationIcon one columns" src="/src/img/gmail-icon.png"></img>
          <div class="gray one columns">Gmail</div>
          <a onClick={this.handleGmailIntegration} class="offset-by-twelve one columns">Connect</a>
        </div>
        <div class="thirteen columns offset-by-one small-border gray-border integrationRow">
          <img class="integrationIcon one columns" src="/src/img/outlook-icon.png"></img>
          <div class="gray one columns">Outlook</div>
          <a onClick={this.handleOutlookIntegration} class="offset-by-twelve one columns">Connect</a>
        </div>
      </div>
    )
  }
}
