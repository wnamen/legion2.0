import React, { Component } from "react";
import { Modal } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

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

    return(
      <div class="sixteen columns gray-light-border pborder extended">
        <div class="pgHeader electric-blue-background">
          <h3 class="white pH3">Standard</h3>
        </div>
        <div class="text-center gray pricingTable">
          <small class="pricingRow">&nbsp;</small>
          <h1 class="priceNumber pricingRow">$120</h1>
          <small class="pricingRow">/month</small>
          <br></br>
          <div class="pricingDescription gray">Sales campaign master? Want to run multiple A/B split tests? Get unlimited campaigns with no limit on touches or contacts to send to!</div>
          <br></br>
          <br></br>
            <Modal
              trigger={
                <div class="lgnBtn lgnBtnLg smoothBkgd white electric-blue-background electric-blue-border">Purchase Now</div>
              }>
              <div class="sixteen modalContainer">
                Modal Code Here
              </div>
            </Modal>
        </div>
      </div>
    )
  }
}
