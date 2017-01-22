import React, { Component, PropTypes } from 'react';
import { Modal, Input } from 'react-materialize';
import cookie from 'react-cookie';
import SignInModal from "../modals/SignInModal";
import { browserHistory } from 'react-router';

class SignUpModal extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      errorReceived: false
    };
  }
  
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  
  handlePhoneChange = (e) => {
    this.setState({ phone: e.target.value });
  };
  
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  
  signUp = (e) => {
    e.preventDefault();
    this.setState({ errorReceived: false });
    
    const { email, password, name, phone } = this.state;
    
    const { http } = this.context;
    
    http.post('users/register', {
      email: email,
      password: password,
      name: name,
      phone: phone
    }).then(response => this.cookieSaver(response.data))
    
  };
  
  cookieSaver = (response) => {
    if (response.success === false) {
      this.setState({ errorReceived: true })
    } else {
      this.signIn();
    }
  };
  
  signIn = () => {
    const { email, password } = this.state;
    const { http } = this.context;
    
    http.post('login', {
      username: email,
      password: password
    }).then(response => {
      cookie.save("token", response.data.token, { path: "/" });
      browserHistory.push('/onboarding');
    })
  };
  
  render() {
    
    const modalTrigger =
      <div>
          <small class="text-center"><a href="#" class="active" id="hideclick">Already have an account?</a></small>
      </div>;
    
    return (
      <div class="sixteen modalContainer" id="hidemodal">
        <div class="eight columns text-center smallModal">
          <img class="modalIcon" src="/src/img/signUpIcon.png" />
          <h1 class="modalTitle gray">You're Almost In!</h1>
          <form id="billingModalForm"  onSubmit={this.signUp} >
            <Input type="text" placeholder="Full Name" onChange={this.handleNameChange} required/>
            <Input type="email" placeholder="Email Address" onChange={this.handleEmailChange} required/>
            <Input type="tel" placeholder="Phone Number" onChange={this.handlePhoneChange} required/>
            <Input type="password" placeholder="Password" onChange={this.handlePasswordChange} required/>
            { this.state.errorReceived && <div>
              <small class="red">It looks like this email is already in use. Please Try a different Email.</small>
            </div> }
            
            <button class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn" type="submit">
              Create My Free Account Now!
            </button>
            
            <Modal trigger={modalTrigger}>
              <SignInModal />
            </Modal>
          </form>
          
        </div>
      </div>
    )
  }
}

SignUpModal.contextTypes = {
  http: PropTypes.func.isRequired
};


export default SignUpModal;
