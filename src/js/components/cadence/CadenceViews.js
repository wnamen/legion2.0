import React, { Component } from "react"
import { Dropdown, Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import TemplatesView from "./TemplatesView"
import NoTemplatesView from "./NoTemplatesView"

export default class CadenceViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
      currentView: false
    }
    this.toggleView = this.toggleView.bind(this);
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT
  toggleView = () => {
    this.setState({currentView: !this.state.currentView});
  }

  render(){
    //RENDER LOGIC HERE
    let current_view = this.state.currentView;

    return(
      <div class="eight columns">
        <a onClick={this.toggleView}>view toggle</a>
        { current_view ? <TemplatesView /> : <NoTemplatesView /> }
      </div>
    )
  }
}
