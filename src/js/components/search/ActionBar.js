import React from "react"
import CSSModules from 'react-css-modules'
import { Dropdown, NavItem } from "react-materialize"

export default class ActionBar extends React.Component {
  render(){
    let data = this.props.results;
    let result_count = data.count;
    if (result_count !== undefined) {
      result_count = result_count.toLocaleString();
    }

    return(
      <div class="eleven columns">
        <nav class="navbar white-background small-border gray-border">
          <div id="action-bar" class="nav-wrapper">
            <ul class="left">
              <li><span id="results-table-count" class="black">Showing {result_count} results</span></li>
            </ul>

            <ul class="right">
              <li id="list-adder-dropdown" class="right-actions">
                <Dropdown trigger={
                  <a>Add to list <i id="list-adder-angle-icon" class="fa fa-angle-down" aria-hidden="true"></i></a>
                }>
                  <NavItem>My List</NavItem>
                  <NavItem>+ Create new list</NavItem>
                </Dropdown>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    )
  }
}