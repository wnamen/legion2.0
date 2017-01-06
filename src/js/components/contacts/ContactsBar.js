import React from "react"
import CSSModules from 'react-css-modules'
import { Dropdown, NavItem, Input, Button, Modal } from "react-materialize"

import UploadContactsModal from "../modals/UploadContactsModal";

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
    const modalTrigger = <a>Upload Contacts</a>;
    let data = this.props.results;
    let result_count = 50;
    if (result_count !== undefined) {
      result_count = "Search " + result_count.toLocaleString() + " Contacts";
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
              <li>
                <Input name="contacts_search" id="contacts-search" placeholder={result_count} onChange={this.handleDebouncer} />
              </li>
            </ul>

            <ul class="right">
              <li><a>Delete List</a></li>
              <li><a>Export CSV</a></li>
              <li>
                <Modal trigger={modalTrigger}>
                  <UploadContactsModal />
                </Modal>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
