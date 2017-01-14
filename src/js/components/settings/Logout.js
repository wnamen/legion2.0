import React, { Component, PropTypes } from "react"
import { Button } from "react-materialize"
import cookie from "react-cookie";
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
    this.logout = this.logout.bind(this);
  }

  logout = (e) => {
    e.preventDefault();
    cookie.remove("token", { path: '/' });
    location.reload();
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render(){
    //RENDER LOGIC HERE

    return(
      <div class="sixteen columns lgbufferMargin">
        <a href="#" class="active" onClick={this.logout}>Logout</a>
      </div>
    )
  }
}


Logout.contextTypes = {
  router: PropTypes.object.isRequired
};
