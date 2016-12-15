import React from "react"
import { Link } from "react-router"

export default class Landing extends React.Component {
  render() {
    console.log("landing");
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="sixteen columns">
              <h3>Welcome to Legion Analytics</h3>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
