import React, { Component } from "react";
import { Modal, Dropdown, NavItem } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import SaveCampaignModal from "../modals/SaveCampaignModal";

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
    const modalTrigger = <div class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn">Save Campaign</div>;

    return(
      <div class="sixteen">
          <div class="gray activeCampaignName">My Campaign</div>
          <div class="topCampaignBtns">
            <div class="lgnBtn smoothBkgd white-background small-border gray-border pauseBtn"><i class="fa fa-pause electric-blue"></i></div>
            <Modal trigger={modalTrigger}>
              <SaveCampaignModal />
            </Modal>
          </div>
      </div>

    )
  }
}
