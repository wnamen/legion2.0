import React, { Component } from "react"
import $ from "jquery"
import {Collapsible, CollapsibleItem} from "react-materialize"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class PlanSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }
  componentWillReceiveProps = () => {
    this.forceUpdate();
  }

  render(){
    let userInfo = this.props.userInfo
    let currentPlan;
    console.log(userInfo);

    if ((userInfo !== undefined) && (userInfo !== "")){
      (userInfo.settings.plan.pay_as_you_go) ? currentPlan = <span class="currentPlan electric-blue">Pay-As-You-Go</span> : currentPlan = <span class="currentPlan electric-blue">Standard</span>
    }

    return(
      <div class="eight columns smtxt">
        <div class="gray">Current Plan: { currentPlan }</div>
        <div class="po">
          <div class="payg">
            <Collapsible>
              <CollapsibleItem header='+ Your Current Package Includes:'>
                <div class="opSlider">
                  <div class="gray">&nbsp; 500 Search Queries/Month</div>
                  <div class="gray">&nbsp; 50,000 Search Results/Month</div>
                  <div class="gray">&nbsp; 10,000 Uploaded Contacts</div>
                  <div class="gray">&nbsp; Build up to 15 Lists</div>
                  <div class="gray">&nbsp; Use 5 Emails Templates Per Campaign</div>
                  <div class="gray">&nbsp; 1 Connected Email Accounts</div>
                  <div class="gray">&nbsp; Limited Campaign Activity Stream</div>
                  <div class="gray">&nbsp; Basic Search Filters</div>
                </div>
              </CollapsibleItem>
              <CollapsibleItem header='+ Standard Package Includes:'>
                <div class="opSlider">
                  <div class="gray">&nbsp; Unlimited Search Queries/Month</div>
                  <div class="gray">&nbsp; Unlimited Search Results/Month</div>
                  <div class="gray">&nbsp; Unlimited Uploaded Contacts</div>
                  <div class="gray">&nbsp; Unlimited Lists</div>
                  <div class="gray">&nbsp; Unlimited Emails Per Campaign</div>
                  <div class="gray">&nbsp; 5 Connected Email Accounts</div>
                  <div class="gray">&nbsp; Live Campaign Activity Stream</div>
                  <div class="gray">&nbsp; Advanced Search Filters</div>
                  <div class="gray">&nbsp; Export CSV</div>
                </div>
              </CollapsibleItem>
            </Collapsible>
          </div>
        </div>
        <a href="#" class="upgrade">Upgrade to Standard for $120/month</a>
      </div>
    )
  }
}
