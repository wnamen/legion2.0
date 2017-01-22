import React, { Component } from "react"


class UploadContactsModal extends Component {
  
  constructor(props) {
    super(props);
  }

  triggerModalClose = () => {
    this.props.handleModalClose();
  };

  render() {
    return (
        <div class="sixteen modalContainer">
         	<div class="eight columns text-center smallModal">
        		<img class="modalIcon smallerIcon" src="/src/img/upload_cloud_asset.png"></img>
        		<h1 class="modalTitle gray">Almost Done!</h1>
        		<h5>Please map your contacts to the correct column name</h5>
		        <div onClick={this.triggerModalClose} class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Map My Contacts</div>
        	</div>
        </div>
    )
  }
}

export default UploadContactsModal;
