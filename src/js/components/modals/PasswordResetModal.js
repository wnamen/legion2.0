import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class PasswordResetModal extends React.Component {
  render() {
    return (
        <div class="sixteen modalContainer">
         	<div class="eight columns offset-by-two text-center">
        		<img class="modalIcon smallerIcon" src="/src/img/emailIcon.png"></img>
        		<h1 class="modalTitle gray">Check Your Email For a Unique Code</h1>
        		<form id="billingModalForm" class="">
		          <Input type="text" placeholder="Unique Code" />
		          <Input type="password" placeholder="New Password" />
		          <Input type="password" placeholder="Confirm Password" />
		          <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Change Password</div>
		        </form>
        	</div>
        </div>
    )
  }
}
