import React, { Component } from "react";
import { Button } from "react-materialize";
import $ from "jquery";

export default class ConnectEmail extends React.Component {
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
        <div class="nine columns offset-by-two text-center">
          <img class="modalIcon smallerIcon" src="/src/img/emailIcon.png"></img>
          <h1 class="modalTitle gray onbTitle">Connect Your Email Account</h1>
          <div id="billingModalForm" class="">
            <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Gmail</div>
            <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Outlook</div>
          </div>
          <div>
            <i class="fa fa-circle billingClosedPagination" aria-hidden="true"></i>
            <i class="fa fa-circle billingOpenPagination" aria-hidden="true"></i>
            <i class="fa fa-circle billingOpenPagination" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}
