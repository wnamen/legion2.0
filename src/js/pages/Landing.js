import React from "react"
import { Link } from "react-router"

export default class Landing extends React.Component {
  render() {
    console.log("landing");
    return (
      <div class="container gray-light-background">
        <div class="sixteen columns">
          <h3>Welcome to Legion Analytics</h3>
        </div>
      </div>

    );
  }
}
