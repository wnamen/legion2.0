import React from "react";
import CSSModules from 'react-css-modules';
import { Dropdown, NavItem, Modal, Input } from "react-materialize";
import classes from "classnames";

import styles from "./css/actionBar.css";
import modalStyles from "./modals/modalStyles.css";
import grid from "../../../css/grid.css";

export default class ActionBar extends React.Component {
  render(){
    let data = this.props.results;
    let result_count = data.count;
    if (result_count !== undefined) {
      result_count = result_count.toLocaleString();
    }

    return(
      <div class="eleven columns">
        <nav class="navbar white-background small-border gray-border">
          <div id={styles.actionBar} class="nav-wrapper">
            <ul class="left">
              <li><span id={styles.resultsTableCount} class="black">Showing {result_count} results</span></li>
            </ul>

            <ul class="right">
              <li id={styles.listAdderDropdown} class={styles.rightActions}>
                <Dropdown trigger={
                  <a>Add to list <i id={styles.listAdderAngleIcon} class="fa fa-angle-down" aria-hidden="true"></i></a>
                }>
                <Modal
                  class={modalStyles.modal}
                  trigger={
                    <NavItem>My List</NavItem>
                  }>
                  <div class={classes(grid.sixteen, modalStyles.modalContainer)}>
                    <img class={modalStyles.image} src="src/img/credit_empty_state.png" />
                    <hr class={modalStyles.contentHr}/>
                    <p class={modalStyles.contentHeader}>You don't have enough credits to do that.</p>
                    <p class={modalStyles.content}>You need 48 more credits</p>
                    <div  class={modalStyles.creditOptionsDropdown}>
                      <Dropdown
                        trigger={
                          <a>Buy 50 Credits <i class={modalStyles.creditOptionsAngleIcon} class="fa fa-angle-down" aria-hidden="true"></i></a>
                        }>
                        <NavItem>50 Credits - $50</NavItem>
                        <NavItem>100 Credits - $90</NavItem>
                        <NavItem>200 Credits - $170</NavItem>
                        <NavItem>500 Credits - $400</NavItem>
                      </Dropdown>
                    </div>
                    <span class={modalStyles.creditDetails}>Your card ending in 3347 </span>
                    <span class={modalStyles.creditDetails}>will be charged $50</span>
                  </div>
              </Modal>
                  <NavItem><Input type="text" placeholder="+ Create new list" /></NavItem>
                </Dropdown>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    )
  }
}
