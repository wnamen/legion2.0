import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class UploadContactsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state=({

    })
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose = () => {
    this.props.onModalClose();
  }

  render() {
    return (
        <div class="sixteen modalContainer">
         	<div class="eight columns text-center smallModal">
        		<img class="modalIcon" src="/src/img/signUpIcon.png"></img>
        		<h1 class="modalTitle gray">Name Your List</h1>
		        <form id="billingModalForm" class="">
              <Input type="text" placeholder="Name of List" />
              <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Create New List</div>
            </form>
        	</div>
        </div>
    )
  }
}
