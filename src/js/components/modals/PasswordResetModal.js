import React, { PropTypes, Component }       from "react";
import { Input } from 'react-materialize'


class PasswordResetModal extends Component {

  constructor(props) {
    super(props);
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
      this.resetPassword();
    } else {
    }
  };

  passwordCheck = () => {
    const { newPassword, passwordConfirm } = this.state;
    return newPassword === passwordConfirm;
  };

  resetPassword = () => {
    this.context.http.post('settings', {token: this.state.uniqueCode, password: this.state.newPassword }
      ).then(response => {
        this.props.handleModalClose()
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

PasswordResetModal.contextTypes = {
  http: PropTypes.func.isRequired
};

export default PasswordResetModal;
