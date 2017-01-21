import React, { PropTypes } from "react"

import BillingForm from "./BillingForm"
import PlanSettings from "./PlanSettings"

const Billing = ({ userInfo, saveCard }) => {
  return (
    <div class="sixteen columns lgbufferMargin">
      <h5 class="settingsSubTitles">Billing</h5>
      <BillingForm userInfo={userInfo} saveCard={saveCard}/>
      <PlanSettings plan={userInfo.settings.plan.name}/>
    </div>
  )
};

export default Billing;

