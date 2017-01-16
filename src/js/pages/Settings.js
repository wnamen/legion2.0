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
      token: cookie.load("token")
    }
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
          userInfo: response
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }


  render() {
    return (
      <div class="ten offset-by-three white-background settingsCard">
        <h6>Settings</h6>
        <br></br>
        <MyAccount userInfo={this.state.userInfo} />
        <Integrations userInfo={this.state.userInfo} />
        <EmailConfiguration userInfo={this.state.userInfo} />
        <Billing userInfo={this.state.userInfo} />
        <Logout userInfo={this.state.userInfo} />
      </div>

    );
  }
}
