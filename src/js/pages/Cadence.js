import React                from "react";
import { Link }             from "react-router";
import cookie               from "react-cookie";

import CadenceMenu          from "../components/cadence/CadenceMenu"
import CadenceViews         from "../components/cadence/CadenceViews"
import CampaignEngagment    from "../components/cadence/CampaignEngagement"

export default class Cadence extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      token: cookie.load("token"),
      currentView: null,
      currentTemplates: null,
      currentDelays: null
    }
    this.loadAvailableCampaigns = this.loadAvailableCampaigns.bind(this);
    this.loadAvailableTemplates = this.loadAvailableTemplates.bind(this);
    this.findSelectedCampaign = this.findSelectedCampaign.bind(this);
    this.findNewCampaignTemplates = this.findNewCampaignTemplates.bind(this);
    this.findSelectedTemplate = this.findSelectedTemplate.bind(this);
    this.findCampaignTemplates = this.findCampaignTemplates.bind(this);
    this.findTemplateData = this.findTemplateData.bind(this);
    this.createNewTemplate = this.createNewTemplate.bind(this);
    this.saveTemplate = this.saveTemplate.bind(this);
    this.makeTemplate = this.makeTemplate.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
    this.createNewCampaign = this.createNewCampaign.bind(this);
    this.saveCampaign = this.saveCampaign.bind(this);
    this.makeCampaign = this.makeCampaign.bind(this);
    this.updateCampaign = this.updateCampaign.bind(this);
    this.deleteCampaign = this.deleteCampaign.bind(this);
  }

  componentWillMount = () => {
    this.loadAvailableCampaigns();
    this.loadAvailableTemplates();
  }

  // LOAD THE USERS CURRENT CAMPAIGNS
  loadAvailableCampaigns = (id) => {
    let tokenHeader = `Token ${this.state.token}`;
    console.log(id);

    $.get({
      url: "https://api.legionanalytics.com/my-cadences?page_size=1000",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setState({
          cadenceData: response
        })
        console.log(id);
        if ((this.state.renderState === "campaign") && (id !== undefined)) {
          this.findSelectedCampaign(id);
        }
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  // LOAD THE USERS CURRENT TEMPLATES
  loadAvailableTemplates = (id) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: "https://api.legionanalytics.com/my-templates?page_size=1000",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setState({
          templateData: response,
        })

        if (this.state.renderState === "campaign") {
          this.findNewCampaignTemplates(id)
        }
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  // CAPTURES THE SELECTED TEMPLATE TO BE RENDERED
  findSelectedTemplate = (id) => {
    let currentTemplate = [];

    this.state.templateData.forEach((template) => {
      if (parseInt(id) === parseInt(template.id)) {
        return currentTemplate.push(template);
      }
    })

    this.setState({renderState: "template", currentView: currentTemplate, currentTemplates: currentTemplate});
  }

  // CAPTURES THE SELECTED CAMPAIGN TEMPLATE TO BE RENDERED
  findNewCampaignTemplates = (id) => {
    let templateList = this.state.campaignTemplateList
    templateList.push(id)
    let currentTemplates = [];
    let disableSave;

    templateList.forEach((templateID) => {
      currentTemplates.push(this.findTemplateData(templateID))
    })

    templateList.length >= 2 ? disableSave = false : disableSave = true;

    this.setState({renderState: "campaign", currentTemplates: currentTemplates, campaignTemplateList: templateList, disableSave: disableSave});
  }

  // CAPTURES THE SELECTED CAMPAIGN TO BE RENDERED
  findSelectedCampaign = (e) => {
    console.log(e);
    let id = isNaN(e) ? e.target.id : e;
    this.state.cadenceData.forEach((cadence) => {
      console.log(id);
      if (parseInt(cadence.id) === parseInt(id)) {
        this.findCampaignTemplates(cadence, cadence.settings.templates)
      }
    })
  }

  // HANDLES THE TEMPLATE SEARCH FOR A CAMPAIGN AND SAVES THE NEW STATE
  findCampaignTemplates = (campaign, templates) => {
    let currentTemplates = [];
    let campaignTemplateList = [];
    let currentDelays = [];

    templates.forEach((template) => {
      currentTemplates.push(this.findTemplateData(template[0]));
      campaignTemplateList.push(parseInt(template[0]));
      if (template[1] !== -1) {
        currentDelays.push(template[1]);
      }
    })
    this.setState({renderState: "campaign", currentView: campaign, currentDelays: currentDelays, campaignTemplateList: campaignTemplateList, currentTemplates: currentTemplates});
  }

  // CAPTURES A SELECTED TEMPLATE
  findTemplateData = (id) => {
    let foundTemplate;

    this.state.templateData.forEach((template) => {
      if (parseInt(id) === parseInt(template.id)) {
        return foundTemplate = template;
      }
    })
    return foundTemplate;
  }

  // INITIALIZE A NEW CAMPAIGN
  createNewCampaign = () => {
    this.setState({
      renderState: "campaign",
      disableSave: true,
      campaignTemplateList: [],
      currentDelays: [],
      currentView: {
        id: null,
        name:"",
        started: true,
        settings: {
          templates: []
        }
      },
      currentTemplates: [{
        id: null,
        html:"",
        subject:"",
        name_of_template:""
      }]
    });
  }

  // DETERMINE CAMPAIGN UPDATE/CREATE
  saveCampaign = (campaign) => {
    console.log(this.state.currentView.id);
    if (this.state.currentView.id === null) {
      this.makeCampaign(campaign);
    } else {
      this.updateCampaign(campaign);
    }
  }

  // CREATE NEW CAMPAIGN
  makeCampaign = (campaign) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.post({
      url: "https://api.legionanalytics.com/make-cadence",
      data: campaign,
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
        this.loadAvailableCampaigns(response.id);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  // UPDATE CAMPAIGN
  updateCampaign = (campaign) => {
    let tokenHeader = `Token ${this.state.token}`;
    campaign["id"] = this.state.currentView.id
    console.log(campaign);

    $.post({
      url: "https://api.legionanalytics.com/update-cadence",
      data: campaign,
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
        this.loadAvailableCampaigns(response.id);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  // DELETE SELECTED CAMPAIGN
  deleteCampaign = (id) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.post({
      url: "https://api.legionanalytics.com/delete-cadence",
      data: {id: id},
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
        this.loadAvailableCampaigns();
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  // INTIALIZE A NEW TEMPLATE
  createNewTemplate = () => {
    this.setState({
      renderState: "template",
      currentView: {
        name:"", started: true,
        settings: {
          templates: []
        }
      },
      currentTemplates: [{
        html:"",
        subject:"",
        name_of_template:""
      }]
    })
  }

  // DETERMINE TEMPLATE UPDATE/CREATE
  saveTemplate = (template) => {
    console.log(template);
    if ((template.id === null) || (template.id === undefined)) {
      this.makeTemplate(template);
    } else {
      this.updateTemplate(template);
    }
  }

  // CREATE NEW TEMPLATE
  makeTemplate = (template) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.post({
      url: "https://api.legionanalytics.com/make-template",
      data: {name: (template.name_of_template || null), subject: (template.subject || null), html: (template.html || null)},
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
        this.loadAvailableTemplates(response.id);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  // UPDATE TEMPLATE
  updateTemplate = (template) => {
    let tokenHeader = `Token ${this.state.token}`;
    console.log(template);

    $.post({
      url: "https://api.legionanalytics.com/update-template",
      data: {id: template.id, name: (template.name_of_template || null), subject: (template.subject || null), html: (template.html || null)},
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
        this.loadAvailableTemplates();
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  // DELETE SELECTED TEMPLATE
  deleteTemplate = (id) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.post({
      url: "https://api.legionanalytics.com/delete-template",
      data: {id: id},
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
        this.loadAvailableTemplates();
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  render() {
    return (
        <div class="gray-light-background">
          <div class="sixteen columns">
            <CadenceMenu cadenceData={this.state.cadenceData} templateData={this.state.templateData} renderCampaign={this.findSelectedCampaign} renderTemplate={this.findSelectedTemplate} createNewCampaign={this.createNewCampaign} createNewTemplate={this.createNewTemplate} deleteTemplate={this.deleteTemplate} deleteCampaign={this.deleteCampaign} />
            <CadenceViews currentView={this.state.currentView} templateData={this.state.templateData} currentTemplates={this.state.currentTemplates} currentDelays={this.state.currentDelays} saveTemplate={this.saveTemplate} saveCampaign={this.saveCampaign} renderState={this.state.renderState} disableSave={this.state.disableSave} campaignTemplateList={this.state.campaignTemplateList}/>
            <CampaignEngagment />
          </div>
        </div>

    );
  }
}
