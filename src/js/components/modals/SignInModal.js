import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'


import PasswordResetModal from "../modals/PasswordResetModal"
export default class SignInModal extends React.Component {
  render() {
    const modalTrigger = <div><small class="text-center"><a href="#" class="active">Forgot Password</a></small></div>

    return (
        <div class="sixteen modalContainer">
          <div class="eight columns offset-by-two text-center">
          		<img class="modalIcon" src="/src/img/logInIcon.png"></img>
          		<h1 class="modalTitle gray">Secure Sign In</h1>
          		<form id="billingModalForm" class="">
      	          <Input type="email" placeholder="Email Address" />
      	          <Input type="password" placeholder="Password" />
                  <Modal trigger={modalTrigger}>
                    <PasswordResetModal />
                  </Modal>
      	          <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Sign In</div>
    	        </form>
        	</div>
        </div>
    )
  }
}
