import React, { Component, PropTypes } from "react"
import { IndexLink, Link } from "react-router";
import { Dropdown, NavItem, Button } from "react-materialize";
import $ from "jquery";

import UserNav from "./UserNav";
import GuestNav from "./GuestNav";

export default class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: false
    }
  }

  componentWillMount() {
    const { http } = this.context;

    http.get(`me`)
      .then(response => {
        console.log(response);
        this.setState({user: true});
      })
      .catch(err => {
        console.log(err)
        this.setState({user: false});
      });

  }

  render() {
    const { location } = this.props;
    return (
        <nav class="navbar navbar-fixed white-background">
            { this.state.user ? <UserNav /> : <GuestNav /> }
        </nav>
    );
  }
}

Nav.contextTypes = {
  http: PropTypes.func.isRequired
};
