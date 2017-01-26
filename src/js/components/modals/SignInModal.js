import React, { Component, PropTypes } from "react";
import { Modal, Input } from 'react-materialize';
import cookie from "react-cookie";

import SignIn from "./signin/SignIn"
import PasswordReset from "./signin/PasswordReset"
import SendUniqueCode from "./signin/SendUniqueCode"

class SignInModal extends Component {

  constructor(props) {
    super(props);
    this.state={
      readyToReset: false,
      modalView: true,
      resetSuccess: false
    }

    this.handleModalView = this.handleModalView.bind(this);
    this.handleResetView = this.handleResetView.bind(this);
    this.handleResetSuccess = this.handleResetSuccess.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      readyToReset: false,
      modalView: true,
      resetSuccess: false
    })
  }

  handleModalView = () => {
    this.setState({modalView: !this.state.modalView})
  }

  handleResetView = () => {
    this.setState({readyToReset: !this.state.readyToReset})
  }

  handleResetSuccess = () => {
    this.setState({resetSuccess: !this.state.resetSuccess})
  }

  render() {
    const { modalView, readyToReset, resetSuccess } = this.state;
    let currentView;

    if (modalView) {
      currentView = <SignIn handleModalView={this.handleModalView} resetSuccess={resetSuccess}/>
    } else {
      if (readyToReset) {
        currentView = <PasswordReset handleResetView={this.handleResetView} handleModalView={this.handleModalView} handleResetSuccess={this.handleResetSuccess}/>;
      } else {
        currentView = <SendUniqueCode handleResetView={this.handleResetView} />
      }
    }

    return (
      <div>
        { currentView }
      </div>
    )
  }
}

SignInModal.contextTypes = {
  router: PropTypes.object.isRequired,
  http: PropTypes.func.isRequired,
};

export default SignInModal;
