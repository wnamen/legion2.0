import React, { Component, PropTypes } from "react";
import { Modal, Input } from 'react-materialize';
import cookie from "react-cookie";

class SignIn extends Component {

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

  changeModalView = () => {
    this.props.handleModalView();
  }

  render() {
    return (
        <div class="sixteen modalContainer">
          <div class="eight columns text-center smallModal">
          		<img class="modalIcon" src="/src/img/logInIcon.png" />
          		<h1 class="modalTitle gray">Secure Sign In</h1>
              { this.props.resetSuccess && <div>
                <small class="green">Your password has been changed. Please sign in to continue.</small>
              </div> }
              <div>
              </div>
          		<form id="billingModalForm" onSubmit={this.signIn}>
      	          <Input type="email" placeholder="Email Address" class="canValidate" onChange={this.handleEmailChange} required/>
      	          <Input type="password" placeholder="Password" class="canValidate" onChange={this.handlePasswordChange} required/>
                  <small class="text-center" style={{"display":"block"}}>
                    <a id="password-reset" class="active" onClick={this.changeModalView}>Forgot Password</a>
                  </small>
      	          <button type="submit" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Sign In</button>
    	        </form>
        	</div>
        </div>
    )
  }
}

SignIn.contextTypes = {
  router: PropTypes.object.isRequired,
  http: PropTypes.func.isRequired,
};

export default SignIn;
