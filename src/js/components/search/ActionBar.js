import React from "react"
import CSSModules from 'react-css-modules'
import { Dropdown, NavItem } from "react-materialize"
// import Styles from "./nav.css"

export default class ActionBar extends React.Component {
  render(){
    return(
      <div class="ten columns">
        <nav class="navbar">
          <div class="nav-wrapper">
            <ul class="left">
              <li><a>Showing 5,312 results</a></li>
            </ul>

            <ul class="right">
              <li>
                <Dropdown trigger={
                  <a>Add to list <i class="fa fa-angle-down" aria-hidden="true"></i></a>
                }>
                  <NavItem>My First List</NavItem>
                  <NavItem>Founder Contacts</NavItem>
                  <NavItem>Ecommerce Tech Stack</NavItem>
                  <NavItem>+ Create new list</NavItem>
                </Dropdown>
              </li>
              <li><a href="#">Get Contacts</a></li>
              <li><a href="#">Export CSV</a></li>
            </ul>
          </div>

        </nav>
      </div>
    )
  }
}
