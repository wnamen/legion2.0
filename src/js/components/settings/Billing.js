import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import BillingForm from "./BillingForm"
import PlanSettings from "./PlanSettings"

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    console.log(this.props);

    return(
      <div class="sixteen columns lgbufferMargin">
      <h5 class="settingsSubTitles">Billing</h5>
        <BillingForm userInfo={this.props.userInfo} saveCard={this.props.saveCard}/>
        <PlanSettings userInfo={this.props.userInfo} />
      </div>
    )
  }
}
