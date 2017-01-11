import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'
import SignInModal from "../modals/SignInModal"
export default class SignUpModal extends React.Component {

  render() {

    const modalTrigger = <div><small class="text-center"><a href="#" class="active" id="hideclick">Already have an account?</a></small></div>

    return (
        <div class="sixteen modalContainer" id="hidemodal">
        	<div class="eight columns text-center smallModal">
        		<img class="modalIcon" src="/src/img/signUpIcon.png"></img>
        		<h1 class="modalTitle gray">You're Almost In!</h1>
        		<form id="billingModalForm" class="">
		          <Input type="text" placeholder="Full Name" />
		          <Input type="email" placeholder="Email Address" />
		          <Input type="tel" placeholder="Phone Number" />
		          <Input type="password" placeholder="Password" />
		          <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Create My Free Account Now!</div>
		          <Modal trigger={modalTrigger}>
                    <SignInModal />
                  </Modal>
                </form>
        	</div>
        </div>
    )
  }
}
