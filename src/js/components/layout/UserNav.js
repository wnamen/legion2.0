import React from "react";
import { IndexLink, Link } from "react-router";
import { Dropdown, NavItem, Button, Modal } from "react-materialize";
import cookie from "react-cookie";

// import PurchaseButton from "./PurchaseButton";
// import ConfirmButton from "./ConfirmButton";

export default class UserNav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonStatus: "buy",
      token: cookie.load("token"),
      currentCredits: 0
    }
    this.preventClose = this.preventClose.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentWillMount = () => {
    let tokenHeader = `Token ${this.state.token}`;
    $.get({
      url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/me",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
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

  render() {
    let currentCredits = (this.state.currentCredits).toLocaleString();

    let buttonStatus = this.state.buttonStatus;
    let buttonRender;

    if (buttonStatus === "buy") {
      buttonRender = <button onClick={this.handleBuy} name="buy" class="credit-button electric-blue-background white">Buy</button>
    } else {
      buttonRender = <button onClick={this.handleConfirm} name="confirm" value="500" class="credit-button green-background white">Confirm</button>
    }
    // <NavItem>25k Credits - $6,250 <div class="inline electric-blue-background white" buy="true">Buy</div> <div class="hidden green-background" confirmBuy="false" priceVal="6250" numCredits="25000" id="25KCredits">Confirm?</div></NavItem>

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
                  <NavItem>10k Credits - $3,300 { buttonRender }</NavItem>
                  <NavItem>5k Credits - $2,500 { buttonRender }</NavItem>
                  <NavItem>3k Credits - $1,800 { buttonRender }</NavItem>
                  <NavItem>1k Credits - $750 { buttonRender }</NavItem>
                  <NavItem>500 Credits - $400 { buttonRender }</NavItem>
                  <NavItem>200 Credits - $170 { buttonRender }</NavItem>
                  <NavItem>100 Credits - $100 { buttonRender }</NavItem>
                  <NavItem>50 Credits - $60 { buttonRender }</NavItem>
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
