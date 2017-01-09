import React, { Component } from "react"
import $ from "jquery"

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
      <div class="sixteen columns gray-light-border pborder">
        <div class="pgHeader gray-light-background">
          <h3 class="gray pH3">Premium</h3>
        </div>
        <div class="text-center gray pricingTable">
          <small class="pricingRow">&nbsp;</small>
          <h1 class="priceNumber pricingRow">$300</h1>
          <small class="pricingRow">/month</small>
          <br></br>
          <div class="pricingDescription gray">Looking to automate your entire sales outreach? Get access to everything in the Standard plan & get instant access to Kylie.ai, our ai sales rep.</div>
          <br></br>
          <a href="mailto:support@legionanalytics.com?subject=Premium Account Request&body=Hi there, I'm interested in the premium package you have to offer. Could you have someone reach out to me to set up a call to discuss further?" target="_blank"><div class="lgnBtn lgnBtnLg smoothBkgd electric-blue white-background electric-blue-border">Contact Us</div></a>
        </div>
      </div>
    )
  }
}
