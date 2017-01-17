import React, { Component } from "react"
import { Input, Dropdown, Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import ConfigurationWindow from "./ConfigurationWindow";
import ConfigurationControls from "./ConfigurationControls";

export default class EmailConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDefault: true
    }
    this.handleSelected = this.handleSelected.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleSelected = (e) => {
    let selectedValue = parseInt(e.target.value);
    let selectedEmail;

    this.props.emails.forEach((email, index) => {
      if (email.id === selectedValue) {
        selectedEmail = this.props.emails[index];

        this.setState({
          displayDefault: false,
          currentEmailID: selectedValue,
          currentEmailData: selectedEmail,
          newName: "",
          newEmail: "",
          newCheck: "",
          reset: true
        })
      }
    })
  }

  onNameChange = (name) => {
    this.setState({
      newName: name,
      reset: false
    })
  }

  onEmailChange = (email) => {
    this.setState({
      newEmail: email,
      reset: false
    })
  }

  onPrimaryCheck = (check) => {
    console.log(check);
    this.setState({
      newCheck: check,
      reset: false
    })
  }

  handleSave = () => {
    // let newCheck = this.state.newCheck || null;
    let newName = this.state.newName || null;
    let newEmail = this.state.newEmail || null;
    let emailID = this.state.currentEmailID || this.props.emails[0].id;

    this.props.saveAlias({emailID: emailID, emailName: newName, emailHandle: newEmail})
  }

  handleRemove = () => {

    // this.props.removeAlias()
  }

  render(){
    let emailData = this.props.emails;
    let mappedAliases;
    let currentWindow;
    let currentControls;

    if ((emailData !== null) && (emailData !== undefined) && (emailData.length > 0)) {
      if (this.state.displayDefault) {
        currentWindow = <ConfigurationWindow details={this.props.emails[0]} newName={this.state.newName} newEmail={this.state.newEmail}/>
        currentControls = <ConfigurationControls details={this.props.emails[0]} isPrimary={this.props.emails[0].is_primary} displayDefault={this.state.displayDefault} onNameChange={this.onNameChange} onEmailChange={this.onEmailChange} onPrimaryCheck={this.onPrimaryCheck} newCheck={this.state.newCheck} reset={this.state.reset}/>
      } else {
        currentWindow = <ConfigurationWindow details={this.state.currentEmailData} newName={this.state.newName} newEmail={this.state.newEmail}/>
        currentControls = <ConfigurationControls details={this.state.currentEmailData} isPrimary={this.state.currentEmailData.is_primary} displayDefault={this.state.displayDefault} onNameChange={this.onNameChange} onEmailChange={this.onEmailChange} onPrimaryCheck={this.onPrimaryCheck} newCheck={this.state.newCheck} reset={this.state.reset}/>
      }

      mappedAliases = emailData.map((email, index) => {
        return (
          <option key={index} value={email.id}>{email.credential_handle}</option>
        )
      })
    } else {
      mappedAliases = <option>No Emails Connected</option>
    }

    return(
      <div class="sixteen columns lgbufferMargin">
        <h5 class="settingsSubTitles">Email Configuration</h5>
        <div class="twelve columns">
          <div class="emailSelect">
            <div class="gray inline-block">Configure</div>
            <div class="inline-block configureEmail">
              <Input type='select' name="whichEmail" onChange={this.handleSelected}>
                { mappedAliases }
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
