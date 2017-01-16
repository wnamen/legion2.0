import React, { Component } from "react"
import { Input, Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class BillingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.captureCardNumber = this.captureCardNumber.bind(this);
    this.captureCardMonth = this.captureCardMonth.bind(this);
    this.captureCardYear = this.captureCardYear.bind(this);
    this.captureCardZipCode = this.captureCardZipCode.bind(this);
    this.saveNewCard = this.saveNewCard.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  captureCardNumber = (e) => {
    this.setState({cardNumber: e.target.value})
  }

  captureCardZipCode = (e) => {
    this.setState({cardZipCode: e.target.value})
  }

  captureCardMonth = (e) => {
    this.setState({cardMonth: e.target.value})
  }

  captureCardYear = (e) => {
    this.setState({cardYear: e.target.value})
  }

  saveNewCard = (e) => {
    let cardNumber = this.state.cardNumber;
    let cardZipCode = this.state.cardZipCode;
    let cardMonth = this.state.cardMonth;
    let cardYear = this.state.cardYear;

    console.log(cardNumber, cardZipCode, cardMonth, cardYear);

    this.resetFields();
  }

  resetFields = () => {
    $("#cardNumberField").val("");
    $("#cardMonthField").val("");
    $("#cardYearField").val("");
    $("#cardZipCodeField").val("");
  }

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
            <Input id="cardNumberField" type="text" placeholder="Credit Card Number" onChange={this.captureCardNumber}/>
            <div class="billingDates sixteen">
              <Input id="cardMonthField" type="text" placeholder="Exp. Month" class="eight" onChange={this.captureCardMonth}/>
              <Input id="cardYearField" type="text" placeholder="Exp. Year" class="eight" onChange={this.captureCardYear}/>
            </div>
            <Input id="cardZipCodeField" type="text" placeholder="Zip Code" onChange={this.captureCardZipCode}/>
            <div class="lgnBtn settingsBtn smoothBkgd electric-blue-background white cardSave" onClick={this.saveNewCard}>Save</div>
          </form>
        </div>
      </div>
    )
  }
}
