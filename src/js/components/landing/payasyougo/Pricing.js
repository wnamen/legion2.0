import React, { Component } from "react";
import { Modal } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import SignUpModal from "../../modals/SignUpModal";

export default class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render(){
    //RENDER LOGIC HERE
    const modalTrigger = <div class="lgnBtn lgnBtnLg smoothBkgd electric-blue white-background electric-blue-border">Create My Free Account</div>

    return(
      <div class="sixteen gray-light-border pborder">
        <div class="pgHeader gray-light-background">
          <h3 class="gray pH3">Pay-As-You-Go</h3>
        </div>

        <div class="text-center gray pricingTable">
          <small class="pricingRow">Starting at</small>
          <h1 class="priceNumber pricingRow">$0.25</h1>
          <small class="pricingRow">/credit</small>
          <br></br>
          <div class="pricingDescription gray">Access Email Data, Phone Numbers, Facebook, Linkedin, Twitter, & more! Use credits to run sales campaigns with unlimited touches and contacts.</div>
          <br></br>
          <Modal trigger={modalTrigger}>
            <SignUpModal />
          </Modal>
        </div>
      </div>
    )
  }
}
