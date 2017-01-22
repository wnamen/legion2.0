import React, { Component, PropTypes } from "react";
import UserNav from "./UserNav";
import GuestNav from "./GuestNav";
import cookie from "react-cookie";


class Nav extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: false
    }
  }
  
  componentWillMount() {
    this.updateState();
  }
  
  componentWillReceiveProps() {
    this.updateState();
  }
  
  updateState = () => {
    this.setState({user: cookie.load('token')});
  };

  render() {
    
    return (
        <nav class="navbar navbar-fixed white-background">
            { this.state.user ? <UserNav /> : <GuestNav /> }
        </nav>
    );
  }
}

export default Nav;
