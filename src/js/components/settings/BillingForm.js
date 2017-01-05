import React, { Component } from "react"
import { Input, Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class BillingForm extends React.Component {
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
      <div class="eight columns">
        <div class="text-center gray smtxt no-margin">
          <p class="no-margin">Current card on file:</p>
          <p class="cardNum">**** **** **** <span>3726</span></p>
        </div>
        <div>
          <form id="billingModalForm" class="nine offset-by-one">
            <Input type="text" placeholder="Credit Card Number" />
            <div class="billingDates sixteen">
              <Input type="text" placeholder="Exp. Month" class="eight"/>
              <Input type="text" placeholder="Exp. Year" class="eight"/>
            </div>
            <Input type="text" placeholder="Zip Code" />
            <div class="lgnBtn settingsBtn smoothBkgd electric-blue-background white cardSave">Save</div>
          </form>
        </div>
      </div>
    )
  }
}
