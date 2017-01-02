import React from "react"
import { IndexLink, Link } from "react-router"
import CSSModules from 'react-css-modules'
import { Dropdown, NavItem, Button } from 'react-materialize'
// import styles from "./nav.css"

export default class Nav extends React.Component {
  render() {
    const { location } = this.props;

    return (
        <nav class="navbar navbar-fixed white-background">
          <div class="nav-wrapper medium-vertical-padding">
            <ul>
              <li><IndexLink class="black medium-right-border gray-border" to="/" ><strong>Legion</strong> Analytics</IndexLink></li>
              <li><Link class="black" to="search" activeClassName="active">Search</Link></li>
              <li><Link class="black" to="cadence" activeClassName="active">Cadence</Link></li>
              <li><Link class="black" to="contacts" activeClassName="active">Contacts</Link></li>
            </ul>

            <div class="right">
              <ul>
                <li id="credit-dropdown">
                  <Dropdown trigger={
                    <a>12,450 credits <i id ="credit-angle-icon" class="fa fa-angle-down" aria-hidden="true"></i><span id="buy-more" class="electric-blue">Buy More</span></a>
                  }>
                    <NavItem>50 Credits - $50 <button class="credit-button electric-blue-background white">Buy</button></NavItem>
                    <NavItem>100 Credits - $90 <button class="credit-button electric-blue-background white">Buy</button></NavItem>
                    <NavItem>200 Credits - $170 <button class="credit-button electric-blue-background white">Buy</button></NavItem>
                    <NavItem>500 Credits - $400 <button class="credit-button electric-blue-background white">Buy</button></NavItem>
                  </Dropdown>
                </li>
                <li class="large-right-margin">
                  <Link class="black" to="profile" activeClassName="active"><i class="gray-medium-2 fa fa-user-circle fa-2x" aria-hidden="true"></i></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}
