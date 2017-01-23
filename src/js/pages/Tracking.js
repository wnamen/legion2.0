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

  componentWillMount() {
    const { type, id } = this.props.params;
    const { http } = this.context;

    if (type === "r") {
      console.log("r");
    } else {
      console.log("e");
    }

    // http.post(`${type}/${id}`).then(response => {this.setState({data: response.data});});

    // if(cookie.load('token')) {
    //   http.get(`ids_connected_to_user`).then(response => this.setState({
    //     user: Object.keys(response.data).length ? 2 : 1}
    //   ));
    // }
    //
    // if(type === 'person' && cookie.load('token')) {
    //   http.get(`/${type}-engagement/${id}`).then(response => {this.setState({engagement: response.data.results})})
    // }
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
  router: React.PropTypes.object,
  http: PropTypes.func.isRequired,
};
