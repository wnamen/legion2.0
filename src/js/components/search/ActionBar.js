import React, { PropTypes, Component, Children } from 'react';
import { Dropdown, NavItem, Modal, Input } from "react-materialize";
import cookie from "react-cookie";

import PurchaseModal from "../modals/PurchaseModal"
import BillingModal from "../modals/BillingModal"
import NewListModal from "../modals/NewListModal";

export default class ActionBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load("token"),
      tmLists: [],
      currentModal: true
    };
    
    this.renderBilling = this.renderBilling.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.loadAvailableLists = this.loadAvailableLists.bind(this);
    this.handleCopySelectedToList = this.handleCopySelectedToList.bind(this);
  }

  componentWillMount = () =>{
    this.loadAvailableLists();
  }

  loadAvailableLists = () => {

    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url:'https://api.legionanalytics.com/tm-list/?page_size=1000',
      headers: {"Authorization": tokenHeader },
      dataType:'json',
      crossDomain: true,
      cache:false,
      success:function(response){
        this.updateLists(response.results);
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  };

  renderBilling() {
    this.setState({ currentModal: !this.state.currentModal })
  }

  updateLists = (lists) => {
    this.setState({
      tmLists:lists
    });
  };

  handleCopySelectedToList = (e) => {
    this.state.tmLists.forEach((list) => {
      if (list.name === e.target.text) {
        this.context.purchaseSelected(parseInt(list.id));
      }
    })
  }

  handleModalClose = (e) => {
    $(".modal-close").trigger("click");
  };

  render(){
    const modalTrigger = <NavItem><div>+ Create new list</div></NavItem>;

    let data = this.props.results;
    let result_count = data.count;
    if (result_count !== undefined) {
      result_count = result_count.toLocaleString();
    }

    let copyLists;
    let listData = this.state.tmLists;

    if ((listData !== undefined) && (listData.length > 0)) {
      copyLists = listData.map((list, index) => {
        return (
          <NavItem key={index} onClick={this.handleCopySelectedToList}>{list.name}</NavItem>
        )
      });
    }

    return(
      <div class="eleven columns">
        <nav class="navbar white-background small-border gray-border">
          <div id="actionBar" class="nav-wrapper">
            <ul class="left">
              <li><span id="resultsTableCount" class="black">Showing {result_count} results</span></li>
            </ul>

            <ul class="right">
              <li id="listAdderDropdown" class="rightActions">
                <Dropdown trigger={
                  <a id="listAdderButton" class="smoothBkgd">Add to list <i id="listAdderAngleIcon" class="fa fa-angle-down" aria-hidden="true" /></a>
                }>
                  { copyLists }
                  <Modal trigger={modalTrigger}>
                    <NewListModal handleModalClose={this.handleModalClose} loadAvailableLists={this.loadAvailableLists}/>
                  </Modal>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

ActionBar.contextTypes = {
  purchaseSelected: PropTypes.func
};






// <Modal
//   trigger={
//     <NavItem>My List</NavItem>
//   }>
//   <div class="sixteen modalContainer">
//     <img class="contentImage" src="src/img/credit_empty_state.png" />
//     <p class="contentHeader">You don't have enough credits to do that.</p>
//     <p class="content">You need 48 more credits</p>
//
//     { this.state.currentModal === true && <PurchaseModal renderBilling={this.renderBilling} /> }
//     { this.state.currentModal === false && <BillingModal renderBilling={this.renderBilling} /> }
//
//   </div>
//   </Modal>
