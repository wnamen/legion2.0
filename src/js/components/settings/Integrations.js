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
    // e.preventDefault();
  }

  handleOutlookIntegration = (e) => {
    // e.preventDefault();
  }

  render(){
    const outlookLink = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?scope=openid+offline_access+https%3A%2F%2Foutlook.office.com%2Fmail.readwrite+https%3A%2F%2Foutlook.office.com%2Fmail.send+https%3A%2F%2Foutlook.office.com%2Fcontacts.readwrite+https%3A%2F%2Foutlook.office.com%2Fcalendars.readwrite&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foutlook%2Fsuccess%2F&response_type=code&client_id=ea6cfa32-1e89-404d-b914-3f6d57d8e869";
    const gmailLink = "https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=994895035422-bes5cqbhmf140j906598j1q91pvcnn08.apps.googleusercontent.com&response_type=code&scope=https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify email profile&redirect_uri=http://localhost:8000/google/success&approval_prompt=force"

    return(
      <div class="sixteen columns lgbufferMargin">
        <h5 class="settingsSubTitles">Integrations</h5>
        <div class="thirteen columns offset-by-one small-border gray-border integrationRow">
          <img class="integrationIcon one columns" src="/src/img/gmail-icon.png"></img>
          <div class="gray one columns">Gmail</div>
          <a onClick={this.handleGmailIntegration} href={gmailLink} class="offset-by-twelve one columns">Connect</a>
        </div>
        <div class="thirteen columns offset-by-one small-border gray-border integrationRow">
          <img class="integrationIcon one columns" src="/src/img/outlook-icon.png"></img>
          <div class="gray one columns">Outlook</div>
          <a onClick={this.handleOutlookIntegration} href={outlookLink} class="offset-by-twelve one columns">Connect</a>
        </div>
      </div>
    )
  }
}
