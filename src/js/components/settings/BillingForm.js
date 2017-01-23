import React, { Component } from "react"
import { Input, Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class BillingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {
        number: "",
        cvc: "",
        exp_month: "",
        exp_year: "",
        zip_code: ""
        }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleToken = this.handleToken.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  componentDidMount = () => {
  	Stripe.setPublishableKey('pk_live_dOwIuwJIzpJSQrgYCPDNgUy1'); // set your test public key
    // Stripe.setPublishableKey('pk_test_hlppy9I1vUFGVYBltYq75eAW'); // set your test public key
  }

	handleChange = (e) => {
    let card = this.state.card;
    card[e.target.name] = parseInt(e.target.value);
    this.setState(card);
	}

  handleToken = (e) => {
    let self = this;

    Stripe.createToken(this.state.card, function (status, response) {
      console.log( status, response );
      self.handleSave(response.id);
    });

  }

  handleSave = (token) => {
    this.props.saveCard(token);
    this.resetFields();
  }

  resetFields = () => {
    $("#cardNumberField").val("");
    $("#cardMonthField").val("");
    $("#cardYearField").val("");
    $("#cardZipCodeField").val("");
    $("#cardCVCField").val("");
  }

  render(){
    let userInfo = this.props.userInfo;
    let currentCardOnFile = <p class="cardNum red">No card on file</p>

    if ((userInfo !== undefined) && (userInfo !== "") && (userInfo.primary_credit_card)) {
      currentCardOnFile = <p class="cardNum">**** **** **** <span>{ userInfo.primary_credit_card.credential_handle }</span></p>;
    }

    return(
      <div class="eight columns">
        <div class="text-center gray smtxt no-margin">
          <p class="no-margin">Current card on file:</p>
          { currentCardOnFile }
        </div>
        <div>
          <form id="billingModalForm" class="nine offset-by-one">
            <Input id="cardNumberField" type="text" name="number" placeholder="Credit Card Number" onChange={this.handleChange}/>
            <div class="billingDates sixteen">
              <Input id="cardMonthField" type="text" name="exp_month" placeholder="Exp. Month" class="eight" onChange={this.handleChange}/>
              <Input id="cardYearField" type="text" name="exp_year" placeholder="Exp. Year" class="eight" onChange={this.handleChange}/>
            </div>
            <div class="billingDates sixteen">
              <Input id="cardZipCodeField" type="text" name="zip_code" placeholder="Zip Code" class="eight" onChange={this.handleChange}/>
              <Input id="cardCVCField" type="text" name="cvc" placeholder="CVC" class="eight" onChange={this.handleChange}/>
            </div>
            <div class="lgnBtn settingsBtn smoothBkgd electric-blue-background white cardSave" onClick={this.handleToken}>Save</div>
          </form>
        </div>
      </div>
    )
  }
}
