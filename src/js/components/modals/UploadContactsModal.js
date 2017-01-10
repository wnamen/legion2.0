import React from "react"
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize'

export default class UploadContactsModal extends React.Component {
  render() {
    return (
        <div class="sixteen modalContainer">
         	<div class="eight columns offset-by-two text-center">
        		<img class="modalIcon smallerIcon" src="/src/img/upload_cloud_asset.png"></img>
        		<h1 class="modalTitle gray">Almost Done!</h1>
        		<h5>Please map your contacts to the correct column name</h5>
		        <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Map My Contacts</div>
        	</div>
        </div>
    )
  }
}
