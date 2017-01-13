import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'
import SignInModal from "../modals/SignInModal"
export default class SignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this);
    this.cookieSaver = this.cookieSaver.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePhoneChange = (e) => {
    this.setState({phone: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  signUp = () => {
    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;
    const phone = this.state.phone;
    const url = "https://legionv2-api.us-west-2.elasticbeanstalk.com/users/register";

    console.log(email, password, url, phone, name);

    $.post({
      url: url,
      data: {email: email, password: password, name: name, phone: phone},
      success: (response) => {
        this.cookieSaver(response);
      },
      error: (response) => {
        console.log(response);
      }
    })

    // this.context.router.transitionTo("/search");
  }

  cookieSaver = (response) => {
    console.log(response);
    cookie.save("token", response.token, { path: "/" });
    hashHistory.push("/search")
  }

  render() {

    const modalTrigger = <div><small class="text-center"><a href="#" class="active" id="hideclick">Already have an account?</a></small></div>

    return (
        <div class="sixteen modalContainer" id="hidemodal">
        	<div class="eight columns text-center smallModal">
        		<img class="modalIcon" src="/src/img/signUpIcon.png"></img>
        		<h1 class="modalTitle gray">You're Almost In!</h1>
        		<form id="billingModalForm" class="">
		          <Input type="text" placeholder="Full Name" onChange={this.handleNameChange} required />
		          <Input type="email" placeholder="Email Address" onChange={this.handleEmailChange} required />
		          <Input type="tel" placeholder="Phone Number" onChange={this.handlePhoneChange} required />
		          <Input type="password" placeholder="Password" onChange={this.handlePasswordChange} required />
		          <div onClick={this.signUp} class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Create My Free Account Now!</div>
		          <Modal trigger={modalTrigger}>
                    <SignInModal />
                  </Modal>
                </form>
        	</div>
        </div>
    )
  }
}
