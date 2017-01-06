import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class BillingModal extends React.Component {
  render() {
    return (
      <div id="billingModal" class="sixteen">
        <form id="billingModalForm" class="five">
          <Input type="text" placeholder="Credit Card Number" />
          <div class="billingDates sixteen">
            <Input type="text" placeholder="Exp. Month" class="eight"/>
            <Input type="text" placeholder="Exp. Year" class="eight"/>
          </div>
          <Input type="text" placeholder="Zip Code" />
        </form>
        <div id="billingDropdown" class="creditOptionsDropdown">
          <Dropdown
            trigger={
              <a>Buy 50 Credits <i class="creditOptionsAngleIcon" class="fa fa-angle-down" aria-hidden="true"></i></a>
            }>
            <NavItem>500 Credits - $400</NavItem>
            <NavItem>200 Credits - $170</NavItem>
            <NavItem>100 Credits - $90</NavItem>
            <NavItem>50 Credits - $50</NavItem>
          </Dropdown>
        </div>
        <div>
          <i class="fa fa-circle billingOpenPagination" aria-hidden="true"></i>
          <i class="fa fa-circle billingClosedPagination" aria-hidden="true"></i>
          <i class="fa fa-circle billingOpenPagination" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}
