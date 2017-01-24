import React, { Component } from "react"

class ActionSaved extends Component {
  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
  }

  closeNotification() {
    this.props.closeNotification();
  }

  render() {

    return (
      <div class="six offset-by-five large-bottom-margin campaignListing electric-blue white-background gray-border notifications">
        <div class="text-left inline-block full-width">
          The contacts have been saved to your list!
          <span onClick={this.closeNotification} class="text-right">&times;</span>
        </div>
      </div>
    )
  }
}

export default ActionSaved;
