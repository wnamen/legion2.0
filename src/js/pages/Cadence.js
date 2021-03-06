import React                from "react";
import { Link }             from "react-router";
import cookie               from "react-cookie";

import CadenceMenu          from "../components/cadence/CadenceMenu"
import CadenceViews         from "../components/cadence/CadenceViews"
import CampaignEngagement    from "../components/cadence/CampaignEngagement"

import ActionSaved      from "../components/notifications/ActionSaved"
import ActionConfirmation      from "../components/notifications/ActionConfirmation"

export default class Cadence extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      token: cookie.load("token"),
      currentView: null,
      currentTemplates: null,
      currentDelays: null,
      notification: {
        confirmation: false,
        success: false
      }
    }
    this.loadAvailableCampaigns = this.loadAvailableCampaigns.bind(this);
    this.loadAvailableTemplates = this.loadAvailableTemplates.bind(this);
    this.loadCampaignEngagements = this.loadCampaignEngagements.bind(this);
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
    this.copiedToClipBoard = this.copiedToClipBoard.bind(this);
  }

  componentWillMount = () => {
    this.loadAvailableCampaigns();
    this.loadAvailableTemplates();
  }

  // LOAD THE USERS CURRENT CAMPAIGNS
  loadAvailableCampaigns = (id) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: "https://api.legionanalytics.com/my-cadences?page_size=1000",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setState({
          cadenceData: response
        })
        if ((this.state.renderState === "campaign") && (id !== undefined)) {
          this.findSelectedCampaign(id);
        }
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
      }
    });
  }


  // LOAD CAMPAIGN ENGAGEMENTS
  loadCampaignEngagements = (id) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: `https://api.legionanalytics.com/cadence-engagement/${id}?page_size=1000`,
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setState({
          engagementData: response.results,
        })
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

  // CAPTURES THE SELECTED CAMPAIGN TO BE RENDERED
  findSelectedCampaign = (e) => {
    let id = isNaN(e) ? e.target.id : e;
    this.state.cadenceData.forEach((cadence) => {
      if (parseInt(cadence.id) === parseInt(id)) {
        this.loadCampaignEngagements(cadence.id)
        this.findCampaignTemplates(cadence, cadence.settings.templates)
      }
    })
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

  // HANDLES THE TEMPLATE SEARCH FOR A CAMPAIGN AND SAVES THE NEW STATE
  findCampaignTemplates = (campaign, templates) => {
    let currentTemplates = [];
    let campaignTemplateList = [];
    let currentDelays = [];

    templates.forEach((template) => {
      currentTemplates.push(this.findTemplateData(template[0]));
      campaignTemplateList.push(parseInt(template[0]));
      currentDelays.push(template[1]);
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
      currentDelays: [-1],
      currentView: {
        id: null,
        name:" ",
        status: "incomplete",
        settings: {
          templates: []
        }
      },
      currentTemplates: [{
        id: null,
        html:" ",
        subject:" ",
        name_of_template:" "
      }]
    });
  }

  // DETERMINE CAMPAIGN UPDATE/CREATE
  saveCampaign = (campaign) => {
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
        this.loadAvailableCampaigns(response.id);
      }
    });
  }

  // UPDATE CAMPAIGN
  updateCampaign = (campaign) => {
    let tokenHeader = `Token ${this.state.token}`;
    campaign["id"] = this.state.currentView.id

    $.post({
      url: "https://api.legionanalytics.com/update-cadence",
      data: campaign,
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setState({
          notification: {success: true},
          message: "Your campaign has been updated!"
        });
        this.loadAvailableCampaigns(response.id);
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
        this.loadAvailableCampaigns();
        this.setState({
          notification: {success: true},
          currentView: null,
          message: "Your campaign has been deleted!"
        })
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
        this.loadAvailableTemplates(response.id);
      }
    });
  }

  // UPDATE TEMPLATE
  updateTemplate = (template) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.post({
      url: "https://api.legionanalytics.com/update-template",
      data: {id: template.id, name: (template.name_of_template || null), subject: (template.subject || null), html: (template.html || null)},
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setState({
          notification: {success: true},
          message: "Your update has been saved!"
        })
        this.loadAvailableTemplates(template.id);
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
        if (response === "message is part of a cadence, can't delete") {
          this.setState({
            notification: {success: true},
            message: "This template is part of a running campaign and can not be deleted."
          })
        } else {
          this.loadAvailableTemplates();
          this.setState({
            notification: {success: true},
            currentView: null,
            message: "You your template has been deleted!"
          })
        }
      }
    });
  }

  // SEND TEST EMAIL
  sendTestEmail = (id) => {
    let tokenHeader = `Token ${this.state.token}`;

    $.post({
      url: "https://api.legionanalytics.com/test-email",
      data: {template_id: id},
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setState({
          notification: {success: true},
          message: "A test email has been sent to your primary email address on file."
        })
      }
    });
  }

  exportToLists = (id) => {
    let tokenHeader = `Token ${this.state.token}`;

    if ((id === undefined) || (id === null)) {
      this.setState({
        notification: {success: true},
        message: "Please select a campaign to export your engagements to a list."
      })
    } else {
      $.post({
        url: "https://api.legionanalytics.com/open-click-cadence",
        data: {cadence_id: id},
        crossDomain:true,
        headers: {"Authorization": tokenHeader },
        success: (response) => {
          this.setState({
            notification: {success: true},
            message: "Your engagements have been exported to your contacts!"
          })
        }
      });
    }
  }

  // ACTIVATES NOTIFICATION TO NOTIFY THE USERS
  copiedToClipBoard = () => {
    this.setState({
      message: "Your Selection has been copied to your clipboard!",
      notification: {
        success: true
      }
    })
  }

  // OPENS CONFIRMATION NOTIFICATION
  openConfirmNotification = (message, list) => {
    this.setState({
      message: message,
      notification: {
        confirmation: true
      }
    });
  }

  // CLOSES THE NOTIFICATION
  closeSuccessNotification = () => {
    this.setState({notification: {success: false}})
  }

  // CLOSES THE NOTIFICATION
  closeConfirmationNotification = (response, list) => {
    response === "yes" ? this.deleteCurrentList(list) : "";
    this.setState({notification: {confirmation: false}})
  }

  render() {
    return (
        <div class="gray-light-background">
          <div class="sixteen columns small-top-margin">
            { this.state.notification.confirmation && <ActionConfirmation message={this.state.message} closeNotification={this.closeConfirmationNotification}/> }
            { this.state.notification.success && <ActionSaved message={this.state.message} closeNotification={this.closeSuccessNotification}/> }

            <CadenceMenu cadenceData={this.state.cadenceData} templateData={this.state.templateData} renderCampaign={this.findSelectedCampaign} renderTemplate={this.findSelectedTemplate} createNewCampaign={this.createNewCampaign} createNewTemplate={this.createNewTemplate} deleteTemplate={this.deleteTemplate} deleteCampaign={this.deleteCampaign} />
            <CadenceViews currentView={this.state.currentView} templateData={this.state.templateData} currentTemplates={this.state.currentTemplates} currentDelays={this.state.currentDelays} saveTemplate={this.saveTemplate} saveCampaign={this.saveCampaign} renderState={this.state.renderState} disableSave={this.state.disableSave} campaignTemplateList={this.state.campaignTemplateList} sendTestEmail={this.sendTestEmail} copiedToClipBoard={this.copiedToClipBoard}/>
            <CampaignEngagement currentView={this.state.currentView} engagementData={this.state.engagementData} exportToLists={this.exportToLists}/>
          </div>
        </div>

    );
  }
}
