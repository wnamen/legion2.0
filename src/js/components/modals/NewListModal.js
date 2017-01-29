import React, { Component, PropTypes } from "react";
import { Input } from 'react-materialize';

class UploadContactsModal extends Component {

  constructor(props) {
    super(props);
  }

  handleListChange = (e) => {
    this.setState({listName: e.target.value});
  };

  createNewList = (e) => {

    e.preventDefault();

    const { listName } = this.state;
    const { http } = this.context;
    const { loadAvailableLists, handleModalClose } = this.props;

    http.post('create-tm', { name: listName }).then(response => loadAvailableLists()).catch(error => this.props.tmLimitReached())

    handleModalClose();
  };

  render() {

    return (
        <div class="sixteen modalContainer">
         	<div class="eight columns text-center smallModal">
        		<img class="modalIcon" src="/src/img/signUpIcon.png" />
        		<h1 class="modalTitle gray">Name Your List</h1>
		        <form id="billingModalForm" >
              <Input type="text" placeholder="Name of List" onChange={this.handleListChange} />
              <button type="submit" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn" onClick={this.createNewList}>Create New List</button>
            </form>
        	</div>
        </div>
    )
  }
}

UploadContactsModal.contextTypes = {
  http: PropTypes.func.isRequired
};


export default UploadContactsModal;
