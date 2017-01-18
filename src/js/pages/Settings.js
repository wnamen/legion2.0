import React, { Component }       from "react";
import { Link }                   from "react-router";
import cookie                     from "react-cookie";

import MyAccount                  from "../components/settings/MyAccount";
import Integrations               from "../components/settings/Integrations";
import EmailConfiguration         from "../components/settings/EmailConfiguration";
import Billing                    from "../components/settings/Billing";
import Logout                     from "../components/settings/Logout";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load("token"),
      userInfo: ""
    }
    this.saveCard = this.saveCard.bind(this);
    this.saveAlias = this.saveAlias.bind(this);
    this.removeAlias = this.removeAlias.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

  componentWillMount = () => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: "https://api.legionanalytics.com/me",
      headers: {"Authorization": tokenHeader },
      dataType: "json",
      crossDomain: true,
      cache:false,
      success:function(response){
        console.log(response);
        this.setState({
          userInfo: response,
          emails: response.emails
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  updateSettings = () => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: "https://api.legionanalytics.com/me",
      headers: {"Authorization": tokenHeader},
      dataType: "json",
      crossDomain: true,
      cache:false,
      success:function(response){
        this.setState({
          userInfo: response,
          emails: response.emails
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  saveAlias = (changes) => {
    let tokenHeader = `Token ${this.state.token}`;
    let newChanges = {change_alias: changes.emailID,}

    changes.emailHandle !== null ? newChanges.aliasemail = changes.emailHandle : "";
    changes.emailName !== null ? newChanges.aliasname = changes.emailName : "";
    // changes.emailPrimary !== null ? newChanges.primary = changes.emailPrimary : "";

    $.post({
      url: "https://api.legionanalytics.com/settings",
      headers: {"Authorization": tokenHeader},
      data: newChanges,
      success: (response) => {
        this.updateSettings();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  removeAlias = (changes) => {
    let tokenHeader = `Token ${this.state.token}`;
    let newChanges = {remove_alias: changes.emailID,}

    $.post({
      url: "https://api.legionanalytics.com/settings",
      headers: {"Authorization": tokenHeader},
      data: newChanges,
      success: (response) => {
        console.log(response);
        this.updateSettings();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  saveCard = (token) => {
    let tokenHeader = `Token ${this.state.token}`;
    let newCard = {new_card: token}

    $.post({
      url: "https://api.legionanalytics.com/settings",
      headers: {"Authorization": tokenHeader},
      data: newCard,
      success: (response) => {
        console.log(response);
        this.updateSettings();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  render() {
    return (
      <div class="ten offset-by-three white-background settingsCard">
        <h6>Settings</h6>
        <br></br>
        <MyAccount userInfo={this.state.userInfo} />
        <Integrations userInfo={this.state.userInfo} />
        <EmailConfiguration emails={this.state.emails} saveAlias={this.saveAlias} removeAlias={this.removeAlias} />
        <Billing userInfo={this.state.userInfo} saveCard={this.saveCard}/>
        <Logout userInfo={this.state.userInfo} />
      </div>

    );
  }
}
