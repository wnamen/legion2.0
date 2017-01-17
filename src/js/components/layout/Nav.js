import React from "react"
import { IndexLink, Link } from "react-router";
import CSSModules from "react-css-modules";
import { Dropdown, NavItem, Button } from "react-materialize";
import $ from "jquery";

import UserNav from "./UserNav";
import GuestNav from "./GuestNav";

export default class Nav extends React.Component {
  render() {
    const { location } = this.props;



    return (
        <nav class="navbar navbar-fixed white-background">
            { location.pathname === "/" ? <GuestNav /> : <UserNav /> }
        </nav>
    );
  }
}
