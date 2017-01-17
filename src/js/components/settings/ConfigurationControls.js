import React, { Component } from "react"
import { Input } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class ConfigurationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkStatus: true,
      unChecked: true
    }
  }

  handleNameChange = (e) => {
    this.props.onNameChange(e.target.value);
  }

  handleEmailChange = (e) => {
    this.props.onEmailChange(e.target.value);
  }

  handlePrimaryCheck = () => {
    if (this.state.unChecked) {
      this.setState({checkStatus: !this.props.isPrimary})
      this.props.onPrimaryCheck(!this.props.isPrimary);
    } else {
      this.setState({checkStatus: !this.state.checkStatus})
      this.props.onPrimaryCheck(!this.state.checkStatus);
    }
  }

  render(){
    let emailData = this.props.details;
    let reset = this.props.reset;
    let isPrimary = this.props.isPrimary;
    let currentCheckStatus = this.state.checkStatus;
    let emailStatus;

    if (reset) {
      $(".aliasField").val("");
    }

    if (this.state.unChecked) {
      currentCheckStatus = isPrimary;
    }

    if ((emailData !== undefined) && (emailData.is_valid)) {
      emailStatus = <td class="text-left electric-blue">Connected</td>;
    } else {
      emailStatus = <td class="text-left red">Error - Not Connected</td>;
    }

    return(
      <div class="ten columns offset-by-two">
        <table id="configuration">
          <tbody>
            <tr>
              <td class="text-right">Name: </td>
              <td class="text-left gray"><Input type="text" placeholder={ emailData.credential_api_key } onChange={this.handleNameChange} class="eight aliasField"/></td>
            </tr>
            <tr>
              <td class="text-right">Alias: </td>
              <td class="text-left gray"><Input type="text" placeholder={ emailData.credential_private_key || emailData.credential_handle } onChange={this.handleEmailChange} class="eight aliasField"/></td>
            </tr>
            <tr>
              <td class="text-right">Primary Account: </td>
              <td class="text-left gray">
                <Input checked={ currentCheckStatus } onChange={this.handlePrimaryCheck} name='primary' type='checkbox' label=" "/>
              </td>
            </tr>
            <tr>
              <td class="text-right">Status: </td>
              { emailStatus }
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
