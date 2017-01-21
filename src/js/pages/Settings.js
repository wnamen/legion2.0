import React, { PropTypes, Component }       from "react";

import MyAccount                  from "../components/settings/MyAccount";
import Integrations               from "../components/settings/Integrations";
import EmailConfiguration         from "../components/settings/EmailConfiguration";
import Billing                    from "../components/settings/Billing";
import Logout                     from "../components/settings/Logout";
import $ from "jquery";


class Settings extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      userInfo: "",
      emails: []
    };
  }
  
  handleModalClose = () => {
    console.log("clicked");
    $(".modal-close").trigger("click");
  };
  
  componentDidMount = () => {
    this.updateSettings()
  };

  updateSettings = () => {
    this.context.http.get('me').then(response =>
      this.setState({
        userInfo: response.data,
        emails: response.data.emails
      })
    );
  };

  saveAlias = (changes) => {
    let newChanges = { change_alias: changes.emailID };

    changes.emailHandle !== null ? newChanges.aliasemail = changes.emailHandle : "";
    changes.emailName !== null ? newChanges.aliasname = changes.emailName : "";

    this.context.http.post('settings', { params: newChanges} ).then(() => this.updateSettings())
  };

  removeAlias = (changes) => {
    this.context.http.post('settings', { params: { remove_alias: changes.emailID }}).then(() => this.updateSettings())
  };

  saveCard = (token) => {
    this.context.http.post('settings', { params: { new_card: token }}).then(response => this.updateSettings());
  };

  render() {
  
    const { userInfo, emails } = this.state;
    
    return (
      <div class="ten offset-by-three white-background settingsCard">
        <h6>Settings</h6>
        <br />
        
        <MyAccount userInfo={userInfo} handleModalClose={this.handleModalClose} />
        <Integrations userInfo={userInfo} />
        <EmailConfiguration emails={emails} saveAlias={this.saveAlias} removeAlias={this.removeAlias} />
        <Billing userInfo={userInfo} saveCard={this.saveCard}/>
        <Logout userInfo={userInfo} />
        
      </div>

    );
  }
}

Settings.contextTypes = {
  http: PropTypes.func.isRequired
};


export default Settings;

