import React from "react";
import $ from "jquery";
import { Dropdown, NavItem, Input, Button, Modal } from "react-materialize";

import UploadContactsModal from "../modals/UploadContactsModal";

export default class ContactsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected:false
    };

    this.completeMapping = this.completeMapping.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount = () => {
    $("#uploadOpen").trigger("click");
  }

  handleModalClose = () => {
    $(".modal-close").trigger("click");
  }


  completeMapping = () => {
    $("contact-upload").text("Uploading...");
    this.props.mapCSV();
    this.props.updateMappingStatus();
  }

  render(){
    const uploadModal = (
            <Modal trigger={<div id="uploadOpen"></div>}>
              <UploadContactsModal handleModalClose={this.handleModalClose}/>
            </Modal>
          );
    let data = this.props.results;
    let result_count = 50;
    if (result_count !== undefined) {
      result_count = "Search " + result_count.toLocaleString() + " Contacts";
    }

    return(
      <div class="sixteen columns">

        <nav class="navbar white-background small-border gray-border">
          <div id="map-bar" class="nav-wrapper">
            <ul class="left">
              <li id="upload-file-name" class="right-actions black">{this.props.filename}</li>
            </ul>
            { uploadModal }

            <ul class="right">
              <li><a class="contact-upload" onClick={this.completeMapping}>Upload Contacts</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
