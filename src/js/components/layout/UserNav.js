import React from "react"
import { IndexLink, Link } from "react-router"
import { Dropdown, NavItem, Button, Modal } from 'react-materialize'

export default class UserNav extends React.Component {
  render() {

    return (
        <div class="nav-wrapper medium-vertical-padding">
          <ul id="nav-links">
            <li><IndexLink class="medium-right-border gray-border" to="/" ><strong>Legion</strong> Analytics</IndexLink></li>
            <li><Link to="search" activeClassName="active">Search</Link></li>
            <li><Link to="cadence" activeClassName="active">Cadence</Link></li>
            <li><Link to="contacts" activeClassName="active">Contacts</Link></li>
            <li><Link to="profile" activeClassName="active">Profile</Link></li>
          </ul>

          <div class="right">
            <ul>
              <li id="credit-dropdown">
                <Dropdown trigger={
                  <a>12,450 credits <i id ="credit-angle-icon" class="fa fa-angle-down" aria-hidden="true"></i><span id="buy-more" class="electric-blue">Buy More</span></a>
                }>
                  <NavItem>500 Credits - $400 <button class="credit-button electric-blue-background white">Buy</button></NavItem>
                  <NavItem>200 Credits - $170 <button class="credit-button electric-blue-background white">Buy</button></NavItem>
                  <NavItem>100 Credits - $90 <button class="credit-button electric-blue-background white">Buy</button></NavItem>
                  <NavItem>50 Credits - $50 <button class="credit-button electric-blue-background white">Buy</button></NavItem>
                </Dropdown>
              </li>
              <li id="settings-button" class="large-right-margin">
                <Link class="black" to="settings" activeClassName="active"><i class="gray-medium-2 fa fa-user-circle fa-2x" aria-hidden="true"></i></Link>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}
