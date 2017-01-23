import React, { Component, PropTypes } from "react"
import { CubeGrid }     from "better-react-spinkit";
import cookie           from "react-cookie";
import $                from "jquery";

import TrackingRedirect from "./TrackingRedirect"

export default class Tracking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load("token"),
    }
  }

  render() {
    const styles = {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }

    return (
      <div class="ten offset-by-three white-background">
        <TrackingRedirect />
      </div>
    );
  }
}

Tracking.contextTypes = {
  router: React.PropTypes.object
};
