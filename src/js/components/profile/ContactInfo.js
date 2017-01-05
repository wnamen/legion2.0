import React, { Component } from "react";
import { Modal } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }

  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render(){

    //RENDER LOGIC HERE


    return(
      <div class="profile-card whiteCard" id="contact-card">
        <div></div>
        <h1 class="adjustedH1">Kevin Hale</h1>
        <p class="gray meta">Partner at Y Combinator</p>
        <h6 class="gray meta local">San Francisco Bay Area</h6>
        <Modal
          trigger={
            <div class="lgnBtn electric-blue-light-background electric-blue-border black lgnBtnUp">Get Kevin's Email</div>
          }>
          <div class="sixteen modalContainer">
            Modal Code Here
          </div>
        </Modal>
        <hr></hr>
        <div class="thumbs">
          <i class="fa fa-thumbs-up thumb-icon electric-blue"></i>
          <i class="fa fa-thumbs-o-down thumb-icon"></i>
        </div>

      </div>
    )
  }
}
