import React, { Component, PropTypes } from "react";
import { IndexLink } from "react-router";
import { Dropdown, NavItem, Modal } from "react-materialize";
import cookie from "react-cookie";

import CreditButtonHandler from "./CreditButtonHandler";
import BillingModal from "../modals/BillingModal"

class UserNav extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      userInfo: "",
      currentCredits: 0,
      currentBilling: false,
    };
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }

  componentWillMount = () => {
    this.loadCurrentCredits();
  };

  loadCurrentCredits = () => {
    this.context.http.get('me', {
      headers: {
        'Authorization': `Token ${cookie.load('token')}`
      }
    }).then(response => {
      this.setState({
        userInfo: response.data,
        currentCredits: response.data.credits,
        currentBilling: (response.data.primary_credit_card !== null) ? true : false,
      })
    }
    );
  };

  saveCard = (token) => {
    this.context.http.post('settings', { new_card: token }).then(response => this.handleModalClose());
  };

  preventClose = (e) => {
    e.stopPropagation();
  };

  handleBuy = (e) => {
    e.stopPropagation();
    this.setState({buttonStatus: "confirm"});
  };

  handleConfirm = (e) => {
    e.stopPropagation();
    this.setState({buttonStatus: "buy"});
  };

  handleModalOpen = () => {
    $("#billingOpen").trigger("click");
  }

  handleModalClose = () => {
    $(".modal-close").trigger("click");
  }

  handleSelection = (e) => {
    this.setState({selected: !this.state.selected})
  };

  render() {
    let currentCredits = (this.state.currentCredits).toLocaleString();
    console.log(this.state.currentBilling);

    return (
        <div class="nav-wrapper medium-vertical-padding">
          <ul id="nav-links" class="nav-hover">
            <li><IndexLink class="medium-right-border gray-border" to="/" ><strong>Legion</strong> Analytics</IndexLink></li>
            <li><IndexLink to="/search" activeClassName="active">Search</IndexLink></li>
            <li><IndexLink to="/campaigns" activeClassName="active">Campaigns</IndexLink></li>
            <li><IndexLink to="/contacts" activeClassName="active">Contacts</IndexLink></li>
          </ul>

          <Modal trigger={<div id="billingOpen"></div>}>
            <div class="sixteen modalContainer">
              <img class="contentImage" src="src/img/credit_empty_state.png" />
              <p class="contentHeader">Looks like you don't have card on file</p>
              <p class="content">Let's get you set up!</p>
              <BillingModal userInfo={this.state.userInfo} saveCard={this.saveCard}/>
            </div>
          </Modal>

          <div class="right">
            <ul>
              <li id="credit-dropdown" class="nav-hover">
                <Dropdown
                  options={{hover:true}}
                  trigger={
                  <a>{ currentCredits } credits <i id ="credit-angle-icon" class="fa fa-angle-down" aria-hidden="true"></i><span id="buy-more" class="electric-blue">Buy More</span></a>
                }>
                  <NavItem>25k Credits - $6,250 <CreditButtonHandler credits={25000} cost={6250} loadCurrentCredits={this.loadCurrentCredits} currentBilling={this.state.currentBilling} handleModalOpen={this.handleModalOpen}/></NavItem>
                  <NavItem>10k Credits - $3,300 <CreditButtonHandler credits={10000} cost={3300} loadCurrentCredits={this.loadCurrentCredits} currentBilling={this.state.currentBilling} handleModalOpen={this.handleModalOpen}/></NavItem>
                  <NavItem>5k Credits - $2,500 <CreditButtonHandler credits={5000} cost={2500} loadCurrentCredits={this.loadCurrentCredits} currentBilling={this.state.currentBilling} handleModalOpen={this.handleModalOpen}/></NavItem>
                  <NavItem>3k Credits - $1,800 <CreditButtonHandler credits={3000} cost={1800} loadCurrentCredits={this.loadCurrentCredits} currentBilling={this.state.currentBilling} handleModalOpen={this.handleModalOpen}/></NavItem>
                  <NavItem>1k Credits - $750 <CreditButtonHandler credits={1000} cost={750} loadCurrentCredits={this.loadCurrentCredits} currentBilling={this.state.currentBilling} handleModalOpen={this.handleModalOpen}/></NavItem>
                  <NavItem>500 Credits - $400 <CreditButtonHandler credits={500} cost={400} loadCurrentCredits={this.loadCurrentCredits} currentBilling={this.state.currentBilling} handleModalOpen={this.handleModalOpen}/></NavItem>
                  <NavItem>200 Credits - $170 <CreditButtonHandler credits={200} cost={170} loadCurrentCredits={this.loadCurrentCredits} currentBilling={this.state.currentBilling} handleModalOpen={this.handleModalOpen}/></NavItem>
                  <NavItem>100 Credits - $100 <CreditButtonHandler credits={100} cost={100} loadCurrentCredits={this.loadCurrentCredits} currentBilling={this.state.currentBilling} handleModalOpen={this.handleModalOpen}/></NavItem>
                  <NavItem>50 Credits - $60 <CreditButtonHandler credits={50} cost={60} loadCurrentCredits={this.loadCurrentCredits} currentBilling={this.state.currentBilling} handleModalOpen={this.handleModalOpen}/></NavItem>
                </Dropdown>
              </li>
              <li id="settings-button" class="large-right-margin nav-hover">
                <IndexLink class="black" to="/settings" activeClassName="active"><i class="gray-medium-2 fa fa-user-circle fa-2x" aria-hidden="true"></i></IndexLink>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}

UserNav.contextTypes = {
  http: PropTypes.func.isRequired
};


export default UserNav;
