import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class PasswordResetModal extends React.Component {
  constructor(props) {
    super(props);

    this.triggerModalClose = this.triggerModalClose.bind(this);
  }

  triggerModalClose = () => {
    this.props.handleModalClose();
  }

  render() {
    return (
        <div class="sixteen modalContainer">
         	<div class="eight columns text-center smallModal">
        		<img class="modalIcon smallerIcon" src="/src/img/emailIcon.png"></img>
        		<h1 class="modalTitle gray">Check Your Email For a Unique Code</h1>
        		<form id="billingModalForm" class="">
		          <Input type="text" placeholder="Unique Code" />
		          <Input type="password" placeholder="New Password" />
		          <Input type="password" placeholder="Confirm Password" />
		          <div onClick={this.triggerModalClose} class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Change Password</div>
		        </form>
        	</div>
        </div>
    )
  }
}
