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
            <NavItem onClick={this.handleClick}>25,000 Credits - $6,250</NavItem>
            <NavItem>10,000 Credits - $3,300</NavItem>
            <NavItem>5,000 Credits - $2,500</NavItem>
            <NavItem>3000 Credits - $1,800</NavItem>
            <NavItem>1,000 Credits - $750</NavItem>
            <NavItem>500 Credits - $400</NavItem>
            <NavItem>200 Credits - $170</NavItem>
            <NavItem>100 Credits - $100</NavItem>
            <NavItem>50 Credits - $60</NavItem>
          </Dropdown>
        </div>
        <span class="creditDetails">Your card ending in <span class="cardNumber">3347</span></span>
        <span class="creditDetails">will be charged $50</span>
      </div>
    )
  }
}
