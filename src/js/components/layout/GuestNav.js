import React from "react";
import { IndexLink, Link } from "react-router";
import { Dropdown, NavItem, Button, Modal } from "react-materialize";

import SignUpModal from "../modals/SignUpModal";
import SignInModal from "../modals/SignInModal";

export default class GuestNav extends React.Component {
  render() {
    const modalTrigger1 = <div class="smlBtn smlBtnLg smoothBkgd electric-blue white-background electric-blue-border">Create My Free Account</div>
    const modalTrigger2 = <a>Sign In</a>

    return (
        <div class="nav-wrapper medium-vertical-padding">
          <ul id="nav-links" class="nav-hover">
            <li><IndexLink class="medium-right-border gray-border" to="/" ><strong>Legion</strong> Analytics</IndexLink></li>
          </ul>

          <div class="right">
            <ul>
              <li class="nav-hover smHide">
                <a href="https://www.kylie.ai" target="_blank" class="electric-blue">Looking for our ai, Kylie?</a>
              </li>
              <li>
                <Modal trigger={modalTrigger1}>
                  <SignUpModal />
                </Modal>
              </li>
              <li class="large-right-margin nav-hover smHide">
                <Modal trigger={modalTrigger2}>
                  <SignInModal />
                </Modal>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}
