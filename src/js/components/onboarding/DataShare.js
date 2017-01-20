import React, { Component } from "react";
import cookie           from "react-cookie";
import $ from "jquery";


class DataShare extends Component {

  onHandleChoice = (choice) => {
  
    let tokenHeader = `Token ${cookie.load("token")}`;
  
    $.ajax({
      url: 'https://api.legionanalytics.com/settings',
      headers: {"Authorization": tokenHeader},
      data: {
        data_shares: choice
      },
      crossDomain: true,
      cache:false,
      success: (industries) => {
        
      }
    });
    
    if(choice) {
      $.ajax({
        url: 'https://api.legionanalytics.com/onboarded-complete',
        headers: {"Authorization": tokenHeader},
        crossDomain: true,
        cache:false,
        success: () => {
          window.location.href = '/search'; //need change to route
        }
      });
    }
  };
  
  render(){
    return(
        <div>
          <img class="modalIcon smallerIcon" src="/src/img/credit_empty_state.png" />
          <h1 class="modalTitle gray onbTitle">Would you like to earn 100 more credits by sharing your data with the Legion Analytics community?</h1>
          <div id="billingModalForm">
            <div onClick={this.onHandleChoice.bind(null, true)} class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Yes, please!</div>
            <div onClick={this.onHandleChoice.bind(null, false)} class="lgnBtn settingsBtn lgnBtnLg smoothBkgd white-background gray gray-border inline-block signupBtn">No, thanks.</div>
          </div>
        </div>
    )
  }
}

export default DataShare;
