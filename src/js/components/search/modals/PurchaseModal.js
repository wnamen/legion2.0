import React from "react"
import { Dropdown, NavItem, Button, Modal } from 'react-materialize'

export default class PurchaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.renderBilling();
  }

  render() {

    return (
      <div id="purchaseModal">
        <div id="purchaseDropdown" class="creditOptionsDropdown">
          <Dropdown
            trigger={
              <a>Buy 50 Credits <i class="creditOptionsAngleIcon" class="fa fa-angle-down" aria-hidden="true"></i></a>
            }>
            <NavItem onClick={this.handleClick}>50 Credits - $50</NavItem>
            <NavItem>100 Credits - $90</NavItem>
            <NavItem>200 Credits - $170</NavItem>
            <NavItem>500 Credits - $400</NavItem>
          </Dropdown>
        </div>
        <span class="creditDetails">Your card ending in <span class="cardNumber">3347</span></span>
        <span class="creditDetails">will be charged $50</span>
      </div>
    )
  }
}
