import React, { Component, PropTypes } from "react";


class DataShare extends Component {

  onHandleChoice = (choice) => {
  
    const { http } = this.context;
    http.post(`settings`, {params: {
      data_shares: choice
    }}).then(response => console.log(response.data));
    
    if(choice) {
      http.post(`onboard-complete`)
        .then(response => window.location.href = '/search' ); //need change to route
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

DataShare.contextTypes = {
  http: PropTypes.func.isRequired
};


export default DataShare;
