import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class SignUpModal extends React.Component {
  render() {
    return (
        <div class="sixteen modalContainer">
        	<div class="eight columns offset-by-two text-center">
        		<img class="modalIcon" src="/src/img/signUpIcon.png"></img>
        		<h1 class="modalTitle gray">You're Almost In!</h1>
        		<form id="billingModalForm" class="">
		          <Input type="text" placeholder="Full Name" />
		          <Input type="email" placeholder="Email Address" />
		          <Input type="tel" placeholder="Phone Number" />
		          <Input type="password" placeholder="Password" />
		          <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Create My Free Account Now!</div>
		        </form>
        	</div>
        </div>
    )
  }
}
