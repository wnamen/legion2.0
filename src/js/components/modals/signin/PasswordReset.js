import React, { PropTypes, Component }       from "react";
import { Input } from 'react-materialize'


class PasswordReset extends Component {

  constructor(props) {
    super(props);
    this.state={errorReceived: false}
  }

  captureNewPassword = (e) => {
    this.setState({ newPassword: e.target.value })
  };

  capturePasswordConfirm = (e) => {
    this.setState({ passwordConfirm: e.target.value })
  };

  captureUniqueCode = (e) => {
    this.setState({ uniqueCode: e.target.value })
  };

  validateNewPassword = (e) => {
    e.preventDefault();
    if (this.passwordCheck()) {
      this.setState({errorReceived: false})
      this.resetPassword();
    } else {
      this.setState({errorReceived: true})
    }
  };

  passwordCheck = () => {
    const { newPassword, passwordConfirm } = this.state;
    return newPassword === passwordConfirm;
  };

  resetPassword = () => {
    this.context.http.post('change-password', {token: this.state.uniqueCode, password: this.state.newPassword }
      ).then(response => {
        this.props.handleResetSuccess();
        this.props.handleModalView();
      })
  };

  render() {
    return (
      <div class="sixteen modalContainer">
        <div class="eight columns text-center smallModal">
          <img class="modalIcon smallerIcon" src="/src/img/emailIcon.png"/>
          <h1 class="modalTitle gray">Check Your Email For a Unique Code</h1>

          <form id="billingModalForm">
            <Input type="text" placeholder="Unique Code" onChange={this.captureUniqueCode}/>
            <Input type="password" placeholder="New Password" onChange={this.captureNewPassword}/>
            <Input type="password" placeholder="Confirm Password" onChange={this.capturePasswordConfirm}/>
              { this.state.errorReceived && <div>
                <small class="red">It looks like the passwords do not match. Please Try again.</small>
              </div> }
            <button type="submit" onClick={this.validateNewPassword}
                 class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">
              Change Password
            </button>
          </form>

        </div>
      </div>
    )
  }
}

PasswordReset.contextTypes = {
  http: PropTypes.func.isRequired
};

export default PasswordReset;
