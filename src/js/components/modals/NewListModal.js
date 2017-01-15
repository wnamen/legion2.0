import React from "react";
import { Dropdown, NavItem, Button, Modal, Input } from 'react-materialize';
import cookie from "react-cookie";

export default class UploadContactsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      token: cookie.load("token")
    })

    this.handleListChange = this.handleListChange.bind(this);
  }

  handleListChange = (e) => {
    this.setState({listName: e.target.value});
  }

  createNewList = () => {
    let tokenHeader = `Token ${this.state.token}`;
    let listName = this.state.listName;

    $.post({
      url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/create-tm",
      headers: {"Authorization": tokenHeader },
      data: {name: listName},
      success: (response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }

    })
    this.props.handleModalClose();
  }

  render() {
    return (
        <div class="sixteen modalContainer">
         	<div class="eight columns text-center smallModal">
        		<img class="modalIcon" src="/src/img/signUpIcon.png"></img>
        		<h1 class="modalTitle gray">Name Your List</h1>
		        <form id="billingModalForm" class="">
              <Input type="text" placeholder="Name of List" onChange={this.handleListChange}/>
              <div class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn" onClick={this.createNewList}>Create New List</div>
            </form>
        	</div>
        </div>
    )
  }
}
