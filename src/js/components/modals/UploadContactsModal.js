import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class UploadContactsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state=({

    })
    this.confirmMapping = this.confirmMapping.bind(this);
  }

  confirmMapping = () => {
    console.log(this.props);
    this.props.onMappingConfirm();
  }

  render() {
    return (
        <div class="sixteen modalContainer">
         	<div class="eight columns text-center smallModal">
        		<img class="modalIcon smallerIcon" src="/src/img/upload_cloud_asset.png"></img>
        		<h1 class="modalTitle gray">Almost Done!</h1>
        		<h5>Please map your contacts to the correct column name</h5>
		        <div onClick={this.confirmMapping} class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Map My Contacts</div>
        	</div>
        </div>
    )
  }
}
