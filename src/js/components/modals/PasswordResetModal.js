import React, { Component } from "react"
import { Input } from 'react-materialize'


class PasswordResetModal extends Component {
  
  constructor(props) {
    super(props);
  }
  
  captureNewPassword = (e) => {
    this.setState({ newPassword: e.target.value })
  };
  
  capturePasswordConfirm = (e) => {
    this.setState({ passwordConfirm: e.target.value })
  };
  
  captureUniqueCode = (e) => {
    this.setState({ uniqueCode: e.target.value })
  };
  
  validateNewPassword = () => {
    if ((this.codeCheck()) && (this.passwordCheck())) {
      console.log("validation passed");
      this.props.handleModalClose();
    } else {
      console.log("validation failed");
    }
  };
  
  codeCheck = () => {
    let correctCode = "code";
    let { uniqueCode } = this.state;
    return correctCode === Boolean(uniqueCode);
  };
  
  passwordCheck = () => {
    const { newPassword, passwordConfirm } = this.state;
    return newPassword === Boolean(passwordConfirm);
  };
  
  render() {
    return (
      <div class="sixteen modalContainer">
        <div class="eight columns text-center smallModal">
          <img class="modalIcon smallerIcon" src="/src/img/emailIcon.png"/>
          <h1 class="modalTitle gray">Check Your Email For a Unique Code</h1>
          
          <form id="billingModalForm">
            <Input type="text" placeholder="Unique Code" onChange={this.captureUniqueCode}/>
            <Input type="password" placeholder="New Password" onChange={this.captureNewPassword}/>
            <Input type="password" placeholder="Confirm Password" onChange={this.capturePasswordConfirm}/>
            <div onClick={this.validateNewPassword}
                 class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">
              Change Password
            </div>
          </form>
        
        </div>
      </div>
    )
  }
}

export default PasswordResetModal;

