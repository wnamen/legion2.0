import React, { Component, PropTypes } from "react";
import { Modal, Input } from 'react-materialize';
import cookie from "react-cookie";

import PasswordResetModal from "../modals/PasswordResetModal"

class SignInModal extends Component {
  
  constructor(props) {
    super(props);
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  };

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  };

  signIn = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { http } = this.context;
    
    http.post('login', {
       username: email,
       password: password
     }).then(response => this.cookieSaver(response.data))
     .catch(response => this.errorValidation())
   };

  cookieSaver = (response) => {
    const { router } = this.context;
    const modal = document.querySelectorAll('.modal-close');
    cookie.save("token", response.token, { path: "/" });
    Object.keys(modal).map(v => modal[v].click());
    router.push("/search");
  };

  errorValidation = (e) => {
    $(".canValidate").addClass("failedValidation");
      window.setTimeout(function(){
        $(".canValidate").removeClass("failedValidation");
      },1000);
  };

  render() {

    const modalTrigger =
      <div>
        <small class="text-center">
          <a href="#" class="active">Forgot Password</a>
        </small>
      </div>;

    return (
        <div class="sixteen modalContainer">
          <div class="eight columns text-center smallModal">
          		<img class="modalIcon" src="/src/img/logInIcon.png" />
          		<h1 class="modalTitle gray">Secure Sign In</h1>
            
          		<form id="billingModalForm" onSubmit={this.signIn}>
      	          <Input type="email" placeholder="Email Address" class="canValidate" onChange={this.handleEmailChange} required/>
      	          <Input type="password" placeholder="Password" class="canValidate" onChange={this.handlePasswordChange} required/>
                  <Modal trigger={modalTrigger}>
                    <PasswordResetModal />
                  </Modal>
      	          <button type="submit" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Sign In</button>
    	        </form>
        	</div>
        </div>
    )
  }
}

SignInModal.contextTypes = {
  router: PropTypes.object.isRequired,
  http: PropTypes.func.isRequired,
};

export default SignInModal;