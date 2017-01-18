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
      token: cookie.load("token")
    }
    this.loadAvailableCampaigns = this.loadAvailableCampaigns.bind(this);
    this.loadAvailableTemplates = this.loadAvailableTemplates.bind(this);
  }

  componentDidMount = () => {
    this.loadAvailableCampaigns();
    this.loadAvailableTemplates();
  }

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

  render() {
    return (
        <div class="gray-light-background">
          <div class="sixteen columns">
            <CadenceMenu cadenceData={this.state.cadenceData} templateData={this.state.templateData} />
            <CadenceViews />
            <CampaignEngagment />
          </div>
        </div>

    );
  }
}
