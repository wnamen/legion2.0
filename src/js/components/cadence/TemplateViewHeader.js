import React, { Component } from "react";
import { Dropdown, NavItem } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class TemplateViewHeader extends React.Component {
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
      <div class="sixteen">
          <div class="topCampaignBtns">
            <div class="lgnBtn smoothBkgd white-background small-border gray-border pauseBtn"><i class="fa fa-pause electric-blue"></i></div>
            <div class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn">Save Campaign</div>
          </div>
      </div>

    )
  }
}
