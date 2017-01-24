import React, { Component } from "react"

class ActionSaved extends Component {
  constructor(props) {
    super(props);
    this.confirmed = this.confirmed.bind(this);
    this.canceled = this.canceled.bind(this);
  }

  confirmed = () => {
    this.props.closeNotification("yes");
  }

  canceled = () => {
    this.props.closeNotification("no")
  }

  render() {

    return (
      <div class="six offset-by-five large-bottom-margin campaignListing electric-blue white-background gray-border notifications">
        <div class="text-left inline-block full-width">
          {this.props.message}
          <span onClick={this.confirmed} class="text-right">Yes</span>
          <span onClick={this.canceled} class="text-right">No</span>
        </div>
      </div>
    )
  }
}

export default ActionSaved;
