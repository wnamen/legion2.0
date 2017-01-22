import React, { PropTypes } from "react";
import { Modal } from "react-materialize";

import PasswordResetModal from "../modals/PasswordResetModal";

const MyAccount = ({ userInfo: { name, email }, handleModalClose }) => {
  const modalTrigger = <td class="text-right newPassword electric-blue">Get New Password</td>;
  
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
          <Modal trigger={modalTrigger}>
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
