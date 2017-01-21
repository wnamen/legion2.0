import React from "react";
import { IndexLink, Link } from "react-router";
import { Dropdown, NavItem, Button, Modal } from "react-materialize";
import cookie from "react-cookie";
import $ from "jquery";

import CreditButtonHandler from "./CreditButtonHandler";

export default class UserNav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: cookie.load("token"),
      currentCredits: 0
    }
    this.preventClose = this.preventClose.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.loadCurrentCredits = this.loadCurrentCredits.bind(this);
  }

  componentWillMount = () => {
    this.loadCurrentCredits();
  }

  loadCurrentCredits = () => {
    let tokenHeader = `Token ${this.state.token}`;
    $.get({
      url: "https://api.legionanalytics.com/me",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setState({currentCredits: response.credits})
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  preventClose = (e) => {
    e.stopPropagation();
  }

  handleBuy = (e) => {
    e.stopPropagation();
    this.setState({buttonStatus: "confirm"});
  }

  handleConfirm = (e) => {
    e.stopPropagation();
    this.setState({buttonStatus: "buy"});
  }

  handleSelection = (e) => {
    this.setState({selected: !this.state.selected})
  }

  render() {
    let currentCredits = (this.state.currentCredits).toLocaleString();

    return (
        <div class="nav-wrapper medium-vertical-padding">
          <ul id="nav-links" class="nav-hover">
            <li><IndexLink class="medium-right-border gray-border" to="/" ><strong>Legion</strong> Analytics</IndexLink></li>
            <li><Link to="search" activeClassName="active">Search</Link></li>
            <li><Link to="campaigns" activeClassName="active">Campaigns</Link></li>
            <li><Link to="contacts" activeClassName="active">Contacts</Link></li>
          </ul>

          <div class="right">
            <ul>
              <li id="credit-dropdown" class="nav-hover">
                <Dropdown
                  options={{hover:true}}
                  trigger={
                  <a>{ currentCredits } credits <i id ="credit-angle-icon" class="fa fa-angle-down" aria-hidden="true"></i><span id="buy-more" class="electric-blue">Buy More</span></a>
                }>
                  <NavItem>25k Credits - $6,250 <CreditButtonHandler credits={25000} cost={6250} loadCurrentCredits={this.loadCurrentCredits}/></NavItem>
                  <NavItem>10k Credits - $3,300 <CreditButtonHandler credits={10000} cost={3300} loadCurrentCredits={this.loadCurrentCredits}/></NavItem>
                  <NavItem>5k Credits - $2,500 <CreditButtonHandler credits={5000} cost={2500} loadCurrentCredits={this.loadCurrentCredits}/></NavItem>
                  <NavItem>3k Credits - $1,800 <CreditButtonHandler credits={3000} cost={1800} loadCurrentCredits={this.loadCurrentCredits}/></NavItem>
                  <NavItem>1k Credits - $750 <CreditButtonHandler credits={1000} cost={750} loadCurrentCredits={this.loadCurrentCredits}/></NavItem>
                  <NavItem>500 Credits - $400 <CreditButtonHandler credits={500} cost={400} loadCurrentCredits={this.loadCurrentCredits}/></NavItem>
                  <NavItem>200 Credits - $170 <CreditButtonHandler credits={200} cost={170} loadCurrentCredits={this.loadCurrentCredits}/></NavItem>
                  <NavItem>100 Credits - $100 <CreditButtonHandler credits={100} cost={100} loadCurrentCredits={this.loadCurrentCredits}/></NavItem>
                  <NavItem>50 Credits - $60 <CreditButtonHandler credits={50} cost={60} loadCurrentCredits={this.loadCurrentCredits}/></NavItem>
                </Dropdown>
              </li>
              <li id="settings-button" class="large-right-margin nav-hover">
                <Link class="black" to="settings" activeClassName="active"><i class="gray-medium-2 fa fa-user-circle fa-2x" aria-hidden="true"></i></Link>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}
