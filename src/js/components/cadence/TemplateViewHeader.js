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
      campaignActivated: true
    }
    this.onCampaignToggle = this.onCampaignToggle.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose = () => {
    $(".modal-close").trigger("click");
  }

  onCampaignToggle = () => {
    this.setState({campaignActivated: !this.state.campaignActivated});
  }

  render(){
    const modalTrigger = <div class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn">Save Campaign</div>;
    const play = <i class="fa fa-play electric-blue"></i>;
    const pause = <i class="fa fa-pause electric-blue"></i>;

    return(
      <div class="sixteen">
          <div class="gray activeCampaignName">My Campaign</div>
          <div class="topCampaignBtns">
            <div onClick={this.onCampaignToggle} class="lgnBtn smoothBkgd white-background small-border gray-border pauseBtn">{ this.state.campaignActivated ? pause : play }</div>
            <Modal trigger={modalTrigger}>
              <SaveCampaignModal handleModalClose={this.handleModalClose}/>
            </Modal>
          </div>
      </div>

    )
  }
}
