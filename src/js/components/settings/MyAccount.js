import React, { Component } from "react";
import { Modal } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import PasswordResetModal from "../modals/PasswordResetModal";

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose = () => {
    console.log("clicked");
    $(".modal-close").trigger("click");
  }

  render(){
    const modalTrigger = <td class="text-right newPassword electric-blue">Get New Password</td>;

    return(
      <div class="sixteen columns">
        <h5 class="settingsSubTitles">My Account</h5>
        <table>
          <tbody class="myAccountTable">
            <tr>
              <td class="text-right gray">Name: </td>
              <td class="text-left gray">Jamasen Rodriguez</td>
            </tr>
            <tr>
              <td class="text-right gray">Email: </td>
              <td class="text-left gray">jamasen@legionanalytics.com</td>
            </tr>
            <tr>
              <Modal trigger={modalTrigger}>
                <PasswordResetModal handleModalClose={this.handleModalClose}/>
              </Modal>
              <td class="text-left"></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
