import React from "react"
import CSSModules from 'react-css-modules'
import { Dropdown, NavItem, Input } from "react-materialize"

export default class ContactsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.getTag = debounce(850, this.getTag.bind(this));
    this.handleDebouncer = this.handleDebouncer.bind(this);
  }

  handleDebouncer(e) {
    e.persist();
  }

  render(){
    let data = this.props.results;
    let result_count = 50;
    if (result_count !== undefined) {
      result_count = result_count.toLocaleString();
    }

    return(
      <div class="sixteen columns">
        <nav class="navbar white-background small-border gray-border">
          <div id="action-bar" class="nav-wrapper">
            <ul class="left">
              <li id="list-adder-dropdown" class="right-actions">
                <Dropdown trigger={
                  <a>All My Contacts <i id="list-adder-angle-icon" class="fa fa-angle-down" aria-hidden="true"></i></a>
                }>
                  <NavItem>All My Contacts</NavItem>
                  <NavItem>+ Create new list</NavItem>
                </Dropdown>
              </li>
              <Input name="contacts_search" id="contacts-search" placeholder="Search ${result_count} Contacts" onChange={this.handleDebouncer} />
            </ul>

            <ul class="right">
              <li><a href="#">Delete List</a></li>
              <li><a href="#">Export CSV</a></li>
              <li><a href="#">Upload Contacts</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}