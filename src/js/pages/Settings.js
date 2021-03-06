import React, { PropTypes, Component }       from "react";
import MyAccount                  from "../components/settings/MyAccount";
import Integrations               from "../components/settings/Integrations";
import EmailConfiguration         from "../components/settings/EmailConfiguration";
import Billing                    from "../components/settings/Billing";
import Logout                     from "../components/settings/Logout";
import ActionSaved                from "../components/notifications/ActionSaved"
import $ from "jquery";
import { CubeGrid } from "better-react-spinkit"
import cookie from "react-cookie";

class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notification: false,
      userInfo: "",
      emails: []
    };
    this.sendUniqueCode = this.sendUniqueCode.bind(this);
  }

  handleModalClose = () => {
    console.log("clicked");
    $(".modal-close").trigger("click");
    this.setState({message: "Your password has been successfully changed!", notification: true})
    this.updateSettings();
  };

  componentDidMount = () => {
    this.updateSettings()
  };

  updateSettings = () => {
    this.context.http.get('me', {
      headers: {
        'Authorization': `Token ${cookie.load('token')}`
      }
    }).then(response =>
      this.setState({
        userInfo: response.data,
        emails: response.data.emails
      })
    );
  };

  sendUniqueCode = () => {
    console.log("sent");
    this.context.http.post('settings', {pw_token: true}).then(response => console.log())
  };

  saveAlias = (changes) => {
    this.context.http.post('settings', changes).then(() => this.updateSettings())
  };

  saveAlias = (changes) => {
    this.context.http.post('settings', changes).then(() => this.updateSettings())
  };

  removeAlias = (changes) => {
    this.context.http.post('settings', { remove_alias: changes.emailID }).then(() => this.updateSettings())
  };

  saveCard = (token) => {
    this.context.http.post('settings', { new_card: token }).then(response => this.updateSettings());
  };

  closeNotification = () => {
    this.setState({notification: false})
  }

  render() {
    const { userInfo, emails } = this.state;

    return (
      <div class="ten offset-by-three white-background settingsCard">
        <h6>Settings</h6>
        <br />
        { this.state.notification && <ActionSaved message={this.state.message} closeNotification={this.closeNotification}/> }
        {!userInfo ? <CubeGrid size={50} color="#36b7ea"/> :
        <div>
          <MyAccount userInfo={userInfo} sendUniqueCode={this.sendUniqueCode} handleModalClose={this.handleModalClose} />
          <Integrations userInfo={userInfo} />
          <EmailConfiguration emails={emails} saveAlias={this.saveAlias} removeAlias={this.removeAlias} />
          <Billing userInfo={userInfo} saveCard={this.saveCard} updateSettings={this.updateSettings}/>
          <Logout userInfo={userInfo} />
        </div>}
      </div>

    );
  }
}

Settings.contextTypes = {
  http: PropTypes.func.isRequired
};


export default Settings;
