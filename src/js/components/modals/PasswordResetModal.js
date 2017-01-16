import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class PasswordResetModal extends React.Component {
  constructor(props) {
    super(props);

    this.captureUniqueCode = this.captureUniqueCode.bind(this);
    this.captureNewPassword = this.captureNewPassword.bind(this);
    this.capturePasswordConfirm = this.capturePasswordConfirm.bind(this);
    this.codeCheck = this.codeCheck.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
  }

  captureNewPassword = (e) => {
    this.setState({newPassword: e.target.value})
  }

  capturePasswordConfirm = (e) => {
    this.setState({passwordConfirm: e.target.value})
  }

  captureUniqueCode = (e) => {
    this.setState({uniqueCode: e.target.value})
  }

  validateNewPassword = () => {
    if ((this.codeCheck()) && (this.passwordCheck())) {
      console.log("validation passed");

      this.props.handleModalClose();
    } else {
      console.log("validation failed");
    }
  }

  codeCheck = () => {
    let correctCode = "code";
    let givenCode = this.state.uniqueCode;

    return correctCode === givenCode ? true : false;
  }

  passwordCheck = () => {
    let correctPassword = this.state.newPassword;
    let givenPassword = this.state.passwordConfirm;

    return correctPassword === givenPassword ? true : false;
  }

  render() {
    return (
        <div class="sixteen modalContainer">
         	<div class="eight columns text-center smallModal">
        		<img class="modalIcon smallerIcon" src="/src/img/emailIcon.png"></img>
        		<h1 class="modalTitle gray">Check Your Email For a Unique Code</h1>
        		<form id="billingModalForm" class="">
		          <Input type="text" placeholder="Unique Code" onChange={this.captureUniqueCode}/>
		          <Input type="password" placeholder="New Password" onChange={this.captureNewPassword}/>
		          <Input type="password" placeholder="Confirm Password" onChange={this.capturePasswordConfirm}/>
		          <div onClick={this.validateNewPassword} class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Change Password</div>
		        </form>
        	</div>
        </div>
    )
  }
}
