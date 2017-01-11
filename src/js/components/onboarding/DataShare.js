import React, { Component } from "react";
import { Button } from "react-materialize";
import $ from "jquery";

export default class DataShare extends React.Component {
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
      <div class="sixteen columns">
        <div class="nine columns onbMargin text-center">
          <img class="modalIcon smallerIcon" src="/src/img/credit_empty_state.png"></img>
          <h1 class="modalTitle gray onbTitle">Would you like to earn 100 more credits by sharing your data with the Legion Analytics community?</h1>
          <div id="billingModalForm" class="">
            <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Yes, please!</div>
            <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd white-background gray gray-border inline-block signupBtn">No, thanks.</div>
          </div>
          <div>
            <i class="fa fa-circle billingOpenPagination" aria-hidden="true"></i>
            <i class="fa fa-circle billingOpenPagination" aria-hidden="true"></i>
            <i class="fa fa-circle billingClosedPagination" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}
