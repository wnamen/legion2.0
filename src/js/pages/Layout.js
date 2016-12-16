import React from "react"
import { Link } from "react-router"

import Nav from "../components/layout/Nav"

export default class Layout extends React.Component {

  render() {
    const { location } = this.props;
    return (
      <div class="gray-light-background">
        <Nav location={location} />
          <div class="row">
              {this.props.children}
          </div>
      </div>

    );
  }
}
