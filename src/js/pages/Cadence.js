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
      currentTemplates: null
    }
    this.loadAvailableCampaigns = this.loadAvailableCampaigns.bind(this);
    this.loadAvailableTemplates = this.loadAvailableTemplates.bind(this);
    this.findSelectedCampaign = this.findSelectedCampaign.bind(this);
    this.findSelectedTemplate = this.findSelectedTemplate.bind(this);
    this.findCampaignTemplates = this.findCampaignTemplates.bind(this);
    this.findTemplateData = this.findTemplateData.bind(this);
    this.createNewCampaign = this.createNewCampaign.bind(this);
    this.saveTemplate = this.saveTemplate.bind(this);
    this.makeTemplate = this.makeTemplate.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
  }

  componentWillMount = () => {
    this.loadAvailableCampaigns();
    this.loadAvailableTemplates();
  }

  // LOAD THE USERS CURRENT CAMPAIGNS
  loadAvailableCampaigns = () => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: "https://api.legionanalytics.com/my-cadences?page_size=1000",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
        this.setState({
          cadenceData: response
        })
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  // LOAD THE USERS CURRENT TEMPLATES
  loadAvailableTemplates = () => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: "https://api.legionanalytics.com/my-templates?page_size=1000",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
        this.setState({
          templateData: response
        })
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
        console.log(template);
        return currentTemplate.push(template);
      }
    })

    this.setState({renderState: "template", currentView: currentTemplate, currentTemplates: currentTemplate});
  }

  // CAPTURES THE SELECTED CAMPAIGN TO BE RENDERED
  findSelectedCampaign = (e) => {
    this.state.cadenceData.forEach((cadence) => {
      if (parseInt(cadence.id) === parseInt(e.target.id)) {
        this.findCampaignTemplates(cadence, cadence.settings.templates)
      }
    })
  }

  // HANDLES THE TEMPLATE SEARCH FOR A CAMPAIGN AND SAVES THE NEW STATE
  findCampaignTemplates = (campaign, templates) => {
    let templateIDs;
    let currentTemplates = [];

    templates.forEach((template) => {
      currentTemplates.push(this.findTemplateData(template[0]))
    })
    this.setState({renderState: "campaign", currentView: campaign, currentTemplates: currentTemplates});
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
    if (template.id === null) {
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
        this.loadAvailableTemplates();
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
      data: {id: template.id, name: (template.templateName || null), subject: (template.subject || null), html: (template.html || null)},
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
            <CadenceMenu cadenceData={this.state.cadenceData} templateData={this.state.templateData} renderCampaign={this.findSelectedCampaign} renderTemplate={this.findSelectedTemplate} createNewCampaign={this.createNewCampaign} createNewTemplate={this.createNewTemplate} deleteTemplate={this.deleteTemplate}/>
            <CadenceViews currentView={this.state.currentView} templateData={this.state.templateData} currentTemplates={this.state.currentTemplates} saveTemplate={this.saveTemplate} renderState={this.state.renderState}/>
            <CampaignEngagment />
          </div>
        </div>

    );
  }
}
