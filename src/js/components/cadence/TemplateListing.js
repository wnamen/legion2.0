import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class TemplateListing extends React.Component {
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
      <div class="sixteen campaignListing gray">
        <div class="text-left full-width">
          <div class="templateName">Template 1</div>
          <div class="stats">
            <span>57% </span><img class="tempImg" src="/src/img/open_icon.svg" title="Open Rate"></img>
            <span>13% </span><img class="tempImg clickImg" src="/src/img/click_icon.svg" title="Click Through Rate"></img>
            <span>4% </span><img class="tempImg" src="/src/img/reply_icon.svg" title="Reply Rate"></img>
          </div>
          <div class="delete">×</div></div>
      </div>
    )
  }
}
