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

  saveAlias = (changes) => {
    let tokenHeader = `Token ${this.state.token}`;

    console.log(changes);

    // $.post({
    //   url:
    //
    // })
  }

  removeAlias = (changes) => {
    // let tokenHeader = `Token ${this.state.token}`;
    //
    // $.post({
    //   url:
    //
    // })
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
