import React from "react"
import CSSModules from 'react-css-modules'
import { Dropdown, NavItem, Input, Button, Modal } from "react-materialize"

import UploadContactsModal from "../modals/UploadContactsModal";

export default class ContactsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected:false
    };

    // this.getTag = debounce(850, this.getTag.bind(this));
    this.handleDebouncer = this.handleDebouncer.bind(this);
    this.completeMapping = this.completeMapping.bind(this);
  }

  handleDebouncer(e) {
    e.persist();
  }

  completeMapping = () => {
    this.props.updateMappingStatus();
  }

  render(){
    const modalTrigger = <a class="contact-upload">Upload Contacts</a>;
    let data = this.props.results;
    let result_count = 50;
    if (result_count !== undefined) {
      result_count = "Search " + result_count.toLocaleString() + " Contacts";
    }

    return(
      <div class="sixteen columns">
        <Modal>
          <UploadContactsModal />
        </Modal>
        <nav class="navbar white-background small-border gray-border">
          <div id="map-bar" class="nav-wrapper">
            <ul class="left">
              <li id="upload-file-name" class="right-actions black">my_contacts.csv</li>
            </ul>

            <ul class="right">
              <li><a class="contact-upload" onClick={this.completeMapping}>Upload Contacts</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
