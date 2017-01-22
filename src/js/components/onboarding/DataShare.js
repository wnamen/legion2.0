import React, { Component, PropTypes } from "react";
import { browserHistory } from 'react-router';


class DataShare extends Component {

  onHandleChoice = (choice) => {
  
    const { http, router } = this.context;
    http.post(`settings`, {
      data_shares: choice
    }).then(response => console.log(response.data));
    
    if(choice) {
      http.post(`onboard-complete`).then(response => browserHistory.push('/search'));
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
  http: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};


export default DataShare;
