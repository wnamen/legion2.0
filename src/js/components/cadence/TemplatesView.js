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
    this.onAppendTemplate = this.onAppendTemplate.bind(this);
    this.onDelayChange = this.onDelayChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleCampaignSave = this.handleCampaignSave.bind(this);
  }

  handleModalClose = () => {
    $(".modal-close").trigger("click");
  }

  onCampaignToggle = () => {
    this.setState({campaignActivated: !this.state.campaignActivated});
  }

  onAppendTemplate = (templates) => {
    this.setState({currentTemplates: templates})
  }

  onDelayChange = (id, delay) => {
    let delays = this.state.currentDelays || this.props.currentDelays;
    delays.forEach((item, index) => {
      if (index === parseInt(id)) {
        return (item[index] = delay);
      }
    }
    this.setState({})
  }

  handleCampaignSave = () => {
    if ((currentView.id === null) && ((this.props.campaignTemplateList).length > 1)) {
      // let campaignChanges = {}
    }
  }

  render(){
    const modalTrigger = <div class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn" onClick={this.createNewCampaign}>Save Campaign</div>;
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
    let delays = this.state.currentDelays || this.props.currentDelays;
    let mappedTemplates;

    if (templates !== null) {
      mappedTemplates = templates.map((template, index) => {
        return (
          <Template key={template.id || `newTemplate ${index}`} data={template} templateData={this.props.templateData} saveTemplate={this.props.saveTemplate}/>
          { (index !== (templates.length-1)) && <TemplateDelay key={`delay ${index}`} id={template.id} currentDelay={delays[index]} onDelayChange={this.onDelayChange} /> }
        )
      })
    }

    return(
      <div class="sixteen">
        { this.props.renderState === "campaign" && header }
        <div class="sixteen templateHolder">
          { mappedTemplates }
          {}
          { this.props.renderState === "campaign" && <TemplateGenerator templateData={this.props.templateData} currentTemplates={this.state.currentTemplates || this.props.currentTemplates} onAppendTemplate={this.onAppendTemplate}/> }
        </div>
      </div>
    )
  }
}
