import React, { Component, PropTypes } from "react"
import { Collapsible, CollapsibleItem } from "react-materialize"


const planTitle = {
  payg: {
    fullName: 'Pay-As-You-Go',
    currentTitle: '+ Your Current Package Includes',
    updateTitle: '+ Standard Package Includes',
    upgradeTitle: 'Upgrade to Standard for $120/month',
  },
  standard: {
    fullName: 'Standard',
    currentTitle: '+ Pay-As-You-Go Package Includes',
    updateTitle: '+ Your Current Package Includes',
    upgradeTitle: 'Downgrade to Pay-As-You-Go',
  },
  premium: {
    fullName: 'Premium',
    currentTitle: '',
    updateTitle: '',
    upgradeTitle: '',
  }
};

const planDesc = (plan) => {
  return plan === 'payg' ?
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
    :
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
};

class PlanSettings extends Component {
  
  constructor(props, context) {
    super(props, context);
  }
  
  updateProfie = () => {
    const { plan } = this.props;
    const { http } = this.context;
    
    http.post('settings', {
        plan_name: plan === 'payg' ? 'standard' : 'payg'
    }, {
      'Content-Type': 'multipart/form-data',
    })
      .then(response => console.log(response))
  };
  
  render() {
    
    let { plan } = this.props;
    
    return (
      <div class="eight columns smtxt">
        <div class="gray">
          Current Plan: <span class="currentPlan electric-blue">{planTitle[plan].fullName}</span>
        </div>
        <div class="po">
          <div class="payg">
            <Collapsible>
              <CollapsibleItem header={planTitle[plan].currentTitle}>
                {planDesc(plan)}
              </CollapsibleItem>
              <CollapsibleItem header={planTitle[plan].updateTitle}>
                {planDesc(plan)}
              </CollapsibleItem>
            </Collapsible>
          </div>
        </div>
        <a class="upgrade" onClick={this.updateProfie}>{planTitle[plan].upgradeTitle}</a>
      </div>
    )
  };
}

PlanSettings.contextTypes = {
  http: PropTypes.func.isRequired
};


export default PlanSettings;
