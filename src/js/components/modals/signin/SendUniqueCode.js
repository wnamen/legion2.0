import React, { PropTypes, Component }       from "react";
import { Input } from 'react-materialize'


class SendUniqueCode extends Component {

  constructor(props) {
    super(props);
    this.state={errorReceived: false}
  }

  captureEmail = (e) => {
    this.setState({ email: e.target.value })
  };

  validateEmail = (e) => {
    e.preventDefault();
    this.setState({errorReceived: false})
    console.log("sent");
    this.context.http.post('change-password', {email: this.state.email}).then(response => {
      if (response === "user not found") {
        this.setState({errorReceived: true})
      } else {
        this.props.handleResetView();
      }
    })
  };

  render() {
    return (
      <div class="sixteen modalContainer">
        <div class="eight columns text-center smallModal">
          <img class="modalIcon smallerIcon" src="/src/img/emailIcon.png"/>
          <h1 class="modalTitle gray">Enter the email address associated with your account</h1>

          <form id="billingModalForm">
            <Input type="text" placeholder="Email" onChange={this.captureEmail}/>
              { this.state.errorReceived && <div>
                <small class="red">It looks like the passwords do not match. Please Try again.</small>
              </div> }
            <button type="submit" onClick={this.validateEmail}
                 class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">
              Send Unique Code
            </button>
          </form>

        </div>
      </div>
    )
  }
}

SendUniqueCode.contextTypes = {
  http: PropTypes.func.isRequired
};

export default SendUniqueCode;
