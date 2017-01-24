import React, { PropTypes } from "react";
import { Modal } from "react-materialize";
import $ from "jquery";

import PasswordResetModal from "../modals/PasswordResetModal";

const MyAccount = ({ userInfo: { name, email }, handleModalClose, sendUniqueCode }) => {
  const getUniqueCode = () => {
    $("#openModal").trigger("click");
    sendUniqueCode();
  }

  return (
    <div class="sixteen columns">
      <h5 class="settingsSubTitles">My Account</h5>
      <table>
        <tbody class="myAccountTable">
        <tr>
          <td class="text-right gray">Name:</td>
          <td class="text-left gray">{name}</td>
        </tr>
        <tr>
          <td class="text-right gray">Email:</td>
          <td class="text-left gray">{email}</td>
        </tr>
        <tr>
          <td class="text-right newPassword electric-blue" onClick={getUniqueCode}>Get New Password</td>
          <Modal trigger={<div id="openModal"></div>}>
            <PasswordResetModal handleModalClose={handleModalClose}/>
          </Modal>
          <td class="text-left"></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
};


export default MyAccount;
