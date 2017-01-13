import React from "react"
import CSSModules from 'react-css-modules'
import { Dropdown, NavItem, Input, Button, Modal } from "react-materialize"

import UploadContactsModal from "../modals/UploadContactsModal";

export default class ContactsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected:true
    };

    // this.getTag = debounce(850, this.getTag.bind(this));
    this.handleDebouncer = this.handleDebouncer.bind(this);
    this.getCSV = this.getCSV.bind(this);
    this.beginMapping = this.beginMapping.bind(this);
  }

  handleDebouncer = (e) => {
    e.persist();
  }

  getCSV = (e) => {
    var holder;
    var filename;
    $("#hiddenInput").trigger("click");
    $('#hiddenInput').change(function() {
        holder = $(this).val();
        filename = holder.replace(/^.*\\/, "");
        $('.fileName').text(filename);
    });
  }

  beginMapping = () => {
    this.props.updateMappingStatus();
  }


  render(){
    let data = this.props.results;
    let result_count = 50;
    if (result_count !== undefined) {
      result_count = "Search " + result_count.toLocaleString() + " Contacts";
    }
    console.log(this.props);

    return(
      <div class="sixteen columns">
        <nav class="navbar white-background small-border gray-border">
          <div id="contacts-bar" class="nav-wrapper">
            <ul class="left">
              <li id="contacts-list-main-selector" class="right-actions">
                <Dropdown trigger={
                  <a>All My Contacts <i id="list-adder-angle-icon" class="fa fa-angle-down" style={{"lineHeight":"30px", "height": "30px"}} aria-hidden="true"></i></a>
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
              <li class="lgnBtn smoothBkgd white-background small-border gray-border medium-right-margin contactsBtn"><div class="red">Delete List</div></li>
              <li class="lgnBtn smoothBkgd white-background small-border gray-border medium-right-margin contactsBtn"><div class="gray">Export CSV</div></li>

              { this.state.isSelected &&
                <li id="contacts-list-selector" class="lgnBtn smoothBkgd white-background small-border gray-border medium-right-margin contactsBtn"><Dropdown trigger={
                <a>Copy to List <i id="list-adder-angle-icon" class="fa fa-angle-down" style={{"lineHeight":"normal"}} aria-hidden="true"></i></a>
              }>
                <NavItem>My List</NavItem>
              </Dropdown></li>
              }
              { this.state.isSelected && <li class="lgnBtn smoothBkgd white-background small-border gray-border medium-right-margin contactsBtn"><div class="gray">Remove</div></li> }

              <li><a class="contact-upload" onClick={this.getCSV}>Upload Contacts</a></li>
              <input onChange={this.beginMapping} type="file" accept=".csv" id="hiddenInput" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn hidden"></input>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
