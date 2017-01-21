import React, { Component } from "react"
import { Input } from "react-materialize"
import $ from "jquery"


class ConfigurationForm extends Component {
  
  constructor(props) {
    super(props);
  }

  handlePrimaryCheck = (e) => {
    this.props.onPrimaryCheck(e.target.checked);
  };
  
  handleNameChange = (e) => {
    this.props.onNameChange(e.target.value)
  };
  
  handleEmailChange = (e) => {
    this.props.onEmailChange(e.target.value)
  };

  render(){
    
    const { reset, email, newCheck, newName, newEmail } = this.props;

    let emailStatus;
    
    if (reset) {
      $(".aliasField").val("");
    }
    
    if ((email !== undefined) && (email.is_valid)) {
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
              <td class="text-left gray">
                <Input
                  type="text"
                  placeholder={ email.credential_api_key }
                  value={newName || ''}
                  onChange={this.handleNameChange.bind(this)}
                  class="eight aliasField"/>
              </td>
            </tr>
            <tr>
              <td class="text-right">Alias: </td>
              <td class="text-left gray">
                <Input
                  type="text"
                  placeholder={ email.credential_private_key || email.credential_handle }
                  value={newEmail || ''}
                  onChange={this.handleEmailChange.bind(this)}
                  class="eight aliasField"
                />
              </td>
            </tr>
            <tr>
              <td class="text-right">Primary Account: </td>
              <td class="text-left gray">
                <Input
                  checked={ newCheck === null ? email.is_primary : newCheck }
                  onChange={this.handlePrimaryCheck}
                  name='primary'
                  type='checkbox'
                  label=" "
                />
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

export default ConfigurationForm;
