import React, { Component } from "react";
import { Modal } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import SignUpModal from "../modals/SignUpModal"

export default class CallToAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render(){
    //RENDER LOGIC HERE
    const modalTrigger = <div class="lgnBtn lgnBtnLg smoothBkgd white electric-blue-background electric-blue-border cta">Create My Free Account</div>

    return(
      <Modal trigger={modalTrigger}>
        <SignUpModal />
      </Modal>
    )
  }
}
