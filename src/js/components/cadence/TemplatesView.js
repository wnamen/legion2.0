import React, { Component } from "react";
import { Input, Button,  Modal, Dropdown, NavItem } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import SaveCampaignModal from "../modals/SaveCampaignModal";
import TemplateGenerator from "./TemplateGenerator";
import Template from "./Template";
import TemplateDelay from "./TemplateDelay";

export default class TemplateViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    const header = (<div><div class="gray activeCampaignName">{this.props.currentView.name}</div>
    <div class="topCampaignBtns">
      <div onClick={this.onCampaignToggle} class="lgnBtn smoothBkgd white-background small-border gray-border pauseBtn">{ this.state.campaignActivated ? pause : play }</div>
      <Modal trigger={modalTrigger}>
        <SaveCampaignModal handleModalClose={this.handleModalClose}/>
      </Modal>
    </div></div>)

    let templates = this.state.currentTemplates || this.props.currentTemplates;
    let mappedTemplates;

    if (templates !== null) {
      mappedTemplates = templates.map((template, index) => {
        return (
          <div>
            <Template key={template.id || `newTemplate ${index}`} data={template} templateData={this.props.templateData} saveTemplate={this.props.saveTemplate}/>
            { (index !== (templates.length-1)) && <TemplateDelay key={ `newDelay${template.id}` || `newDelay${index}`} /> }
          </div>
        )
      })
    }

    return(
      <div class="sixteen">
        { this.props.renderState === "campaign" && header }
        <div class="sixteen templateHolder">
          { mappedTemplates }
          { this.props.renderState === "campaign" && <TemplateGenerator /> }
        </div>
      </div>
    )
  }
}
