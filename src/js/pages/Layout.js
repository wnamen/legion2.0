import React      from "react"
import { Link }   from "react-router"

import Nav from "../components/layout/Nav"

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true
    }
  }

  render() {
    const { location } = this.props;
    return (
      <div class="gray-light-background">
        <Nav location={location} />
          <div>
              {this.props.children}
          </div>
      </div>

    );
  }
}
