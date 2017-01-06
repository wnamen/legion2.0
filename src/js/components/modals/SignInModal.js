import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class SignInModal extends React.Component {
  render() {
    return (
        <div class="sixteen modalContainer">
          <div class="eight columns offset-by-two text-center">
    		<img class="modalIcon" src="/src/img/logInIcon.png"></img>
    		<h1 class="modalTitle gray">Secure Sign In</h1>
    		<form id="billingModalForm" class="">
	          <Input type="email" placeholder="Email Address" />
	          <Input type="password" placeholder="Password" />
	          <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Sign In</div>
	        </form>
    	</div>
        </div>
    )
  }
}
