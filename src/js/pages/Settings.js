import React, { Component }       from "react"
import { Link }                   from "react-router"

import MyAccount                  from "../components/settings/MyAccount"
import Integrations               from "../components/settings/Integrations"
import EmailConfiguration         from "../components/settings/EmailConfiguration"
import Billing                    from "../components/settings/Billing"
import Logout                     from "../components/settings/Logout"

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }

  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render() {
    return (
      <div class="sixteen white-background">
        Settings
        <MyAccount />
        <Integrations />
        <EmailConfiguration />
        <Billing />
        <Logout />
      </div>

    );
  }
}
