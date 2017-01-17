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
    this.saveAlias = this.saveAlias.bind(this);
    this.removeAlias = this.removeAlias.bind(this);
    this.updateAliases = this.updateAliases.bind(this);
  }

  componentWillMount = () => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/me",
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

  updateAliases = () => {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/me",
      headers: {"Authorization": tokenHeader},
      dataType: "json",
      crossDomain: true,
      cache:false,
      success:function(response){
        this.setState({
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
      url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/settings",
      headers: {"Authorization": tokenHeader},
      data: newChanges,
      success: (response) => {
        this.updateAliases();
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
      url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/settings",
      headers: {"Authorization": tokenHeader},
      data: newChanges,
      success: (response) => {
        console.log(response);
        this.updateAliases();
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
        <Billing userInfo={this.state.userInfo} />
        <Logout userInfo={this.state.userInfo} />
      </div>

    );
  }
}
