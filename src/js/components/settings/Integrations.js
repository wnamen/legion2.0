import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Integrations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render(){
    //RENDER LOGIC HERE

    return(
      <div class="sixteen columns lgbufferMargin">
        <h5 class="settingsSubTitles">Integrations</h5>
        <div class="thirteen columns offset-by-one small-border gray-border integrationRow">
          <img class="integrationIcon one columns" src="/src/img/gmail-icon.png"></img>
          <div class="gray one columns">Gmail</div>
          <a href="#" class="offset-by-twelve one columns">Connect</a>
        </div>
        <div class="thirteen columns offset-by-one small-border gray-border integrationRow">
          <img class="integrationIcon one columns" src="/src/img/outlook-icon.png"></img>
          <div class="gray one columns">Outlook</div>
          <a href="#" class="offset-by-twelve one columns">Connect</a>
        </div>
      </div>
    )
  }
}
