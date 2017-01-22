import React, { Component } from "react"
import { Input } from "react-materialize"
import ConfigurationWindow from "./ConfigurationWindow";
import ConfigurationControls from "./ConfigurationControls";

class EmailConfiguration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayDefault: true,
      newName: null,
      newEmail: null,
      newCheck: null,
    };
  }

  handleSelected = (e) => {
    let { emails } = this.props;
    let selectedValue = parseInt(e.target.value);
    let selectedEmail;

    emails.forEach((email, k) => {
      if (email.id === selectedValue) {
        selectedEmail = emails[k];

        this.setState({
          displayDefault: false,
          currentEmailID: selectedValue,
          currentEmailData: selectedEmail,
          newName: null,
          newEmail: null,
          newCheck: null,
          reset: true
        })
      }
    })
  };

  onNameChange = (data) => {
    this.setState({
      newName: data
    })
  };

  onEmailChange = (data) => {
    this.setState({
      newEmail: data
    })
  };

  onPrimaryCheck = (check) => {
    this.setState({
      newCheck: check
    });
  };

  handleSave = () => {
    let { emails, saveAlias } = this.props;
    let { newName, newEmail, newCheck, currentEmailID } = this.state;

    let is_primary = newCheck === true ? {primary: newCheck} : ``;
    let currentEmail = emails.filter(v => v.id == currentEmailID)[0];

    saveAlias({
      change_alias: currentEmailID || emails[0].id,
      aliasemail: newEmail === null ? currentEmailID ? currentEmail.credential_api_key : emails[0].credential_api_key : newEmail,
      aliasname: newName === null ? currentEmailID ? currentEmailID.credential_private_key : emails[0].credential_private_key : newName,
      ...is_primary
    })
  };

  handleRemove = () => {
    let { emails, removeAlias } = this.props;
    let { currentEmailID } = this.state;
    removeAlias({
      emailID: currentEmailID || emails[0].id
    })
  };

  render(){
    const { emails } = this.props;
    const { displayDefault, newName, newEmail, newCheck, reset, currentEmailData } = this.state;

    let currentWindow;
    let currentControls;

    if(emails) {
      currentWindow = <ConfigurationWindow email={displayDefault ? emails[0] : currentEmailData} newName={newName} newEmail={newEmail}/>;
      currentControls = <ConfigurationControls
        email={displayDefault ? emails[0] : currentEmailData}
        displayDefault={displayDefault}
        onNameChange={this.onNameChange}
        onEmailChange={this.onEmailChange}
        onPrimaryCheck={this.onPrimaryCheck}
        newCheck={newCheck}
        newName={newName}
        newEmail={newEmail}
        reset={reset}
      />;
    }

    return(
      <div class="sixteen columns lgbufferMargin">
        <h5 class="settingsSubTitles">Email Configuration</h5>
        <div class="twelve columns">
          <div class="emailSelect">
            <div class="gray inline-block">Configure</div>
            <div class="inline-block configureEmail">
              <Input type='select' name="whichEmail" onChange={this.handleSelected} >
                { emails ? emails.map(email =>
                    <option key={email.id} value={email.id}>
                      { email.credential_handle }
                    </option>) :
                    <option>No Emails Connected</option> }
              </Input>
            </div>
          </div>
          { currentWindow }
          { currentControls }
        </div>
        <div class="btnContainer five columns offset-by-two">
          <div onClick={this.handleSave} class="lgnBtn settingsBtn smoothBkgd electric-blue-background white">Save</div>
          <div onClick={this.handleRemove} class="lgnBtn settingsBtn smoothBkgd white-background small-border gray-border">Remove</div>
        </div>

      </div>
    )
  }
}

export default EmailConfiguration;
