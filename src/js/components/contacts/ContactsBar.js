import React, { PropTypes, Component, Children } from 'react';
import { Dropdown, NavItem, Input, Button, Modal } from "react-materialize"
import { debounce } from 'throttle-debounce';

import UploadContactsModal from "../modals/UploadContactsModal";
import NewListModal from "../modals/NewListModal";

export default class ContactsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListView: "All My Contacts"
    };

    this.handleDebouncer = this.handleDebouncer.bind(this);
    this.searchContacts = debounce(500, this.searchContacts.bind(this));
    this.getCSV = this.getCSV.bind(this);
    this.beginMapping = this.beginMapping.bind(this);
    this.handleNewListView = this.handleNewListView.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.deleteCurrentList = this.deleteCurrentList.bind(this);
    this.handleCopySelectedToList = this.handleCopySelectedToList.bind(this);
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this);
  }

  handleDebouncer = (e) => {
    e.persist();
    this.searchContacts(e);
  }

  searchContacts = (e) => {
    console.log(e.target.value);
    this.props.searchCurrentList(e.target.value);
  }

  getCSV = (e) => {
    let self = this;
    let path;
    let filename;
    $("#hiddenInput").trigger("click");
    $('#hiddenInput').change(function() {
        var file = $(this)[0].files[0];
        path = $(this).val();
        filename = path.replace(/^.*\\/, "");
        $('.fileName').text(filename);
        self.props.uploadCSV(file, filename)
    });

  }

  beginMapping = () => {
    this.props.updateMappingStatus();
  }

  handleNewListView = (e) => {
    this.props.onNewListView(e.target.text);
    this.setState({selectedListView: e.target.text})
  }

  deleteCurrentList = (e) => {
    this.props.deleteCurrentList(this.state.selectedListView)
  }

  handleCopySelectedToList = (e) => {
    this.props.lists.forEach((list) => {
      if (list.name === e.target.text) {
        this.context.copySelected(parseInt(list.id));
      }
    })
  }

  handleRemoveFromList = (e) => {
    this.context.removeSelected()
    this.props.onNewListView(this.state.selectedListView);
  }

  handleModalClose = (e) => {
    $(".modal-close").trigger("click");
  }

  render(){

    const modalTrigger = <NavItem><div>+ Create new list</div></NavItem>;

    let listData = this.props.lists;
    let data = this.props.results;
    let userLists;
    let copyLists;

    let result_count = this.props.resultsCount;
    if (result_count !== undefined) {
      result_count = "Search " + result_count.toLocaleString() + " Contacts";
    }

    if ((listData !== undefined) && (listData.length > 0)) {
      userLists = listData.map((list, index) => {
        return (
          <NavItem key={index} onClick={this.handleNewListView}>{list.name}</NavItem>
        )
      });

      copyLists = listData.map((list, index) => {
        return (
          <NavItem key={index} onClick={this.handleCopySelectedToList}>{list.name}</NavItem>
        )
      });
    }

    return(
      <div class="sixteen columns">
        <nav class="navbar white-background small-border gray-border">
          <div id="contacts-bar" class="nav-wrapper">
            <ul class="left">
              <li id="contacts-list-main-selector" class="right-actions">
                <Dropdown trigger={
                  <a>{ this.state.selectedListView } <i id="list-adder-angle-icon" class="fa fa-angle-down" style={{"lineHeight":"30px", "height": "30px"}} aria-hidden="true"></i></a>
                }>
                  { userLists }
                  <Modal trigger={modalTrigger}>
                    <NewListModal handleModalClose={this.handleModalClose} loadAvailableLists={this.props.loadAvailableLists}/>
                  </Modal>
                </Dropdown>
              </li>
              { this.context.isSelected &&
                <li>
                  <Input name="contacts_search" id="contacts-search" placeholder={result_count} onChange={this.handleDebouncer} />
                </li>
              }
            </ul>

            <ul class="right">
              <li onClick={this.deleteCurrentList} class="lgnBtn smoothBkgd white-background small-border gray-border medium-right-margin contactsBtn"><div class="red">Delete List</div></li>
              <li class="lgnBtn smoothBkgd white-background small-border gray-border medium-right-margin contactsBtn"><div class="gray" onClick={this.props.exportCSV()}>Export CSV</div></li>

              { this.context.isSelected &&
                <li id="contacts-list-selector" class="lgnBtn smoothBkgd white-background small-border gray-border medium-right-margin contactsBtn"><Dropdown trigger={
                <a>Copy to List <i id="list-adder-angle-icon" class="fa fa-angle-down" style={{"lineHeight":"normal"}} aria-hidden="true"></i></a>
              }>
                { copyLists }
              </Dropdown></li>
              }
              { this.context.isSelected && <li class="lgnBtn smoothBkgd white-background small-border gray-border medium-right-margin contactsBtn"><div onClick={this.handleRemoveFromList} class="gray">Remove</div></li> }

              <li><a class="contact-upload" onClick={this.getCSV}>Upload Contacts</a></li>
              <input onChange={this.beginMapping} type="file" accept=".csv" id="hiddenInput" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn hidden"></input>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

ContactsBar.contextTypes = {
  copySelected: PropTypes.func,
  removeSelected: PropTypes.func,
  isSelected: PropTypes.bool
};
