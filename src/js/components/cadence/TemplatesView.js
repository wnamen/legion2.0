import React, { Component } from "react";
import { Input, Button,  Modal, Dropdown, NavItem } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import SaveCampaignModal from "../modals/SaveCampaignModal";
import TemplateGenerator from "./TemplateGenerator";
import Template from "./Template";

export default class TemplateViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignActivated: true,
    }
    this.onCampaignStatusToggle = this.onCampaignStatusToggle.bind(this);
    this.onAppendTemplate = this.onAppendTemplate.bind(this);
    this.onDelayChange = this.onDelayChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleCampaignSave = this.handleCampaignSave.bind(this);
  }

  // CLOSES THE MODAL
  handleModalClose = () => {
    $(".modal-close").trigger("click");
  }

  // HANDLES THE CAMPAIGN STATUS
  onCampaignStatusToggle = () => {
    if (this.props.currentView.status === "paused") {
      this.props.saveCampaign({id: this.props.currentView.id, pause: false});
    } else {
      this.props.saveCampaign({id: this.props.currentView.id, pause: true});
    }
  }

  // ADDS A TEMPORARY TEMPLATE TO THE ACTIVE CAMPAIGN LIST
  onAppendTemplate = (templates, delays) => {
    let campaignTemplateList = [];

    templates.forEach((template) => {
      (template.id !== undefined && template.id !== null) ? campaignTemplateList.push(template.id) : "";
    })

    this.setState({currentTemplates: templates, currentDelays: delays, campaignTemplateList: campaignTemplateList })
  }

  // ADDS A DELAY CHANGE TO THE ACTIVE DELAYS AND UPDATES THE CAMPAIGN
  onDelayChange = (index, delay, templateID) => {
    let delays = this.state.currentDelays || this.props.currentDelays;
    delays.forEach((item, idx) => {
      if (idx === parseInt(index)) {
        return (delays[idx] = delay);
      }
    })
    if ((templateID > 0) && (this.props.currentView.id > 0 )) {
      this.props.saveCampaign({id: this.props.currentView.id, templates: this.props.campaignTemplateList, delays: delays})
    }

    this.setState({currentDelays: delays})
  }

  // SAVES THE CAMPAIGN
  handleCampaignSave = () => {
    let delays = [];
    this.props.currentDelays.forEach((item) => {
      if (item !== -1) {
        delays.push(item)
      }
    })
    let campaign = {templates: this.props.campaignTemplateList, delays: delays}

    this.props.saveCampaign(campaign)
    this.activateModal();
  }

  // ACTIVATES THE SAVE CAMPAGIN MODAL
  activateModal = () => {
    setTimeout(() => {$("#uploadOpen").trigger("click")}, 500)
  }

  // UPDATES THE CURRENT CAMPAIGN
  handleCampaignUpdate = (campaign) => {
    this.props.saveCampaign(campaign)
  }

  // SAVES THE TEMPLATE
  handleTemplateSave = (templateChanges) => {
    this.props.saveTemplate(templateChanges);
  }

  render(){

    const play = <i class="fa fa-play electric-blue"></i>;
    const pause = <i class="fa fa-pause electric-blue"></i>;
    const header = (<div><div class="gray activeCampaignName">{this.props.currentView.name}</div>
    <div class="topCampaignBtns">
      { ((this.props.currentView.status !== "pending") && (this.props.currentView.status !== "incomplete")) && <div onClick={this.onCampaignStatusToggle} class="lgnBtn smoothBkgd white-background small-border gray-border pauseBtn">{ this.props.currentView.status === "paused" ? play : pause }</div> }
      <button class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn" disabled={this.props.disableSave} onClick={this.handleCampaignSave}>Save Campaign</button>
      <Modal trigger={<div id="uploadOpen" ></div>}>
        <SaveCampaignModal key={this.props.currentView.id} currentView={this.props.currentView} handleCampaignUpdate={this.handleCampaignUpdate} handleModalClose={this.handleModalClose}/>
      </Modal>
    </div></div>)

    let templates = this.state.currentTemplates || this.props.currentTemplates;
    let delays = this.state.currentDelays || this.props.currentDelays;
    let mappedTemplates;

    // MAPS THE ACTIVE TEMPLATES TO THE VIEW
    if (templates !== null) {
      mappedTemplates = templates.map((template, index) => {
        if ((this.props.renderState === "campaign") && (template !== undefined)) {
          return (
            <Template key={`template ${template.id || index}`} data={template} dataIndex={index} templateData={this.props.templateData} handleTemplateSave={this.handleTemplateSave} currentDelay={delays[index]} onDelayChange={this.onDelayChange} currentTemplates={this.state.currentTemplates || this.props.currentTemplates} currentDelays={this.state.currentDelays || this.props.currentDelays} onAppendTemplate={this.onAppendTemplate} sendTestEmail={this.props.sendTestEmail}/>
          )
        } else if (template !== undefined) {
          return (
            <Template key={`template ${template.id || index}`} data={template} dataIndex={index} templateData={this.props.templateData} handleTemplateSave={this.handleTemplateSave} currentDelay={null} currentTemplates={this.state.currentTemplates || this.props.currentTemplates} currentDelays={this.state.currentDelays || this.props.currentDelays} onAppendTemplate={this.onAppendTemplate} sendTestEmail={this.props.sendTestEmail}/>
          )
        }
      })
    }

    return(
      <div class="sixteen">
        { this.props.renderState === "campaign" && header }
        <div class="sixteen templateHolder">
          { mappedTemplates }
          { this.props.renderState === "campaign" && <TemplateGenerator templateData={this.props.templateData} currentTemplates={this.state.currentTemplates || this.props.currentTemplates} currentDelays={this.state.currentDelays || this.props.currentDelays} onAppendTemplate={this.onAppendTemplate}/> }
        </div>
      </div>
    )
  }
}
