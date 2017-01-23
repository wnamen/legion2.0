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

  onAppendTemplate = (templates, delays) => {
    let campaignTemplateList = [];

    templates.forEach((template) => {
      (template.id !== undefined && template.id !== null) ? campaignTemplateList.push(template.id) : "";
    })

    this.setState({currentTemplates: templates, currentDelays: delays, campaignTemplateList: campaignTemplateList })
  }

  onDelayChange = (id, delay) => {
    let delays = this.state.currentDelays || this.props.currentDelays;
    delays.forEach((item, index) => {
      if (index === parseInt(id)) {
        return (item.delay = delay);
      }
    })
    this.setState({currentDelays: delays})
  }

  handleCampaignSave = () => {
    let delays = [];

    this.props.currentDelays.forEach((item) => {
      delays.push(item.delay)
    })

    let campaign = {templates: this.props.campaignTemplateList, delays: delays}
    console.log(campaign);
    this.props.saveCampaign(campaign)
    this.activateModal();
  }

  activateModal = () => {
    $("#uploadOpen").trigger("click");
  }

  handleTemplateSave = (templateChanges) => {
    this.setState({currentTemplates: null, currentDelays: null, currentView: null})
    this.props.saveTemplate(templateChanges);
  }

  render(){
    const play = <i class="fa fa-play electric-blue"></i>;
    const pause = <i class="fa fa-pause electric-blue"></i>;

    const header = (<div><div class="gray activeCampaignName">{this.props.currentView.name}</div>
    <div class="topCampaignBtns">
      <div onClick={this.onCampaignToggle} class="lgnBtn smoothBkgd white-background small-border gray-border pauseBtn">{ this.state.campaignActivated ? pause : play }</div>
      <button class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn" disabled={this.props.disableSave} onClick={this.handleCampaignSave}>Save Campaign</button>
      <Modal trigger={<div id="uploadOpen"></div>}>
        <SaveCampaignModal handleModalClose={this.handleModalClose}/>
      </Modal>
    </div></div>)

    let templates = this.state.currentTemplates || this.props.currentTemplates;
    let delays = this.state.currentDelays || this.props.currentDelays;
    let mappedTemplates;

    console.log(this.props.campaignTemplateList);

    if (templates !== null) {
      mappedTemplates = templates.map((template, index) => {
        console.log(template);
        if (this.props.renderState === "campaign") {
          return (
            <Template key={template.id || `newTemplate ${index}`} data={template} dataIndex={index} templateData={this.props.templateData} handleTemplateSave={this.handleTemplateSave} currentDelay={delays[index] !== undefined ? delays[index].delay : null} onDelayChange={this.onDelayChange} currentTemplates={this.state.currentTemplates || this.props.currentTemplates} currentDelays={this.state.currentDelays || this.props.currentDelays} onAppendTemplate={this.onAppendTemplate} />
          )
        } else {
          return (
            <Template key={template.id || `newTemplate ${index}`} data={template} dataIndex={index} templateData={this.props.templateData} handleTemplateSave={this.handleTemplateSave} currentDelay={null} currentTemplates={this.state.currentTemplates || this.props.currentTemplates} currentDelays={this.state.currentDelays || this.props.currentDelays} onAppendTemplate={this.onAppendTemplate} />
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
