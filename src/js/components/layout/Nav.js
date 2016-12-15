import React from "react"
import { IndexLink, Link } from "react-router"
import CSSModules from 'react-css-modules'
import { Dropdown, NavItem, Button } from 'react-materialize'
// import Styles from "./nav.css"

export default class Nav extends React.Component {
  render() {
    const { location } = this.props;

    return (
        <nav class="navbar navbar-fixed">
          <div class="nav-wrapper">
            <ul>
              <li><IndexLink to="/" ><strong>Legion</strong> Analytics</IndexLink></li>
              <li><Link to="search" activeClassName="active">Search</Link></li>
              <li><Link to="stats" activeClassName="active">Stats</Link></li>
              <li><Link to="cadence" activeClassName="active">Cadence</Link></li>
              <li><Link to="contacts" activeClassName="active">Contacts</Link></li>
            </ul>

            <div class="right">
              <ul>
                <li>
                  <Dropdown trigger={
                    <a>12,450 credits <i class="fa fa-angle-down" aria-hidden="true"></i><span id="buy-more">Buy More</span></a>
                  }>
                    <NavItem>50 Credits - $50<button>Buy</button></NavItem>
                    <NavItem>100 Credits - $90<button>Buy</button></NavItem>
                    <NavItem>200 Credits - $170<button>Buy</button></NavItem>
                    <NavItem>500 Credits - $400<button>Buy</button></NavItem>
                  </Dropdown>
                </li>
                <li>
                  <a href="#">
                    IMG HOLDER
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}
