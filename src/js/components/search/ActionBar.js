import React from "react";
import { Dropdown, NavItem, Modal, Input } from "react-materialize";

import PurchaseModal from "../modals/PurchaseModal"
import BillingModal from "../modals/BillingModal"

export default class ActionBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: true
    }
    this.renderBilling = this.renderBilling.bind(this);
  }

  renderBilling() {
    this.setState({ currentModal: !this.state.currentModal })
  }

  render(){
    let data = this.props.results;
    let result_count = data.count;
    if (result_count !== undefined) {
      result_count = result_count.toLocaleString();
    }

    return(
      <div class="eleven columns">
        <nav class="navbar white-background small-border gray-border">
          <div id="actionBar" class="nav-wrapper">
            <ul class="left">
              <li><span id="resultsTableCount" class="black">Showing {result_count} results</span></li>
            </ul>

            <ul class="right">
              <li id="listAdderDropdown" class="rightActions">
                <Dropdown trigger={
                  <a>Add to list <i id="listAdderAngleIcon" class="fa fa-angle-down" aria-hidden="true"></i></a>
                }>
                <Modal
                  trigger={
                    <NavItem>My List</NavItem>
                  }>
                  <div class="sixteen modalContainer">
                    <img class="contentImage" src="src/img/credit_empty_state.png" />
                    <p class="contentHeader">You don't have enough credits to do that.</p>
                    <p class="content">You need 48 more credits</p>

                    { this.state.currentModal === true && <PurchaseModal renderBilling={this.renderBilling} /> }
                    { this.state.currentModal === false && <BillingModal renderBilling={this.renderBilling} /> }

                  </div>
                  </Modal>
                  <NavItem><Input type="text" placeholder="+ Create new list" /></NavItem>
                </Dropdown>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    )
  }
}
