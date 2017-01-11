import React, { Component, PropTypes } from "react";
import { Redirect } from "react-router"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize';
import $ from "jquery";

import PasswordResetModal from "../modals/PasswordResetModal"
export default class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passowrd: ""
    }

    this.signIn = this.signIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  signIn = () => {
    const email = this.state.email;
    const password = this.state.password;
    const url = "https://legionv2-api.us-west-2.elasticbeanstalk.com/login";

    console.log(email, password, url);

    $.post({
      url: url,
      data: {username: email, password: password},
      success: (response) => {
        console.log(response);
        this.context.router.push('/search');
      },
      error: (response) => {
        console.log(response);
      }
    })

  }


  render() {
    const modalTrigger = <div><small class="text-center"><a href="#" class="active">Forgot Password</a></small></div>

    return (
        <div class="sixteen modalContainer">
          <div class="eight columns text-center smallModal">
          		<img class="modalIcon" src="/src/img/logInIcon.png"></img>
          		<h1 class="modalTitle gray">Secure Sign In</h1>
          		<form id="billingModalForm" class="">
      	          <Input type="email" placeholder="Email Address" onChange={this.handleEmailChange} required/>
      	          <Input type="password" placeholder="Password" onChange={this.handlePasswordChange} required/>
                  <Modal trigger={modalTrigger}>
                    <PasswordResetModal />
                  </Modal>
      	          <div onClick={this.signIn} class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Sign In</div>
    	        </form>
        	</div>
        </div>
    )
  }
}

SignInModal.contextTypes = {
  router: PropTypes.object.isRequired
};
