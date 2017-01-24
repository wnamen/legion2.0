import React, { Component } from "react"

class ActionSaved extends Component {
  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
  }

  closeNotification() {
    this.props.renderBilling();
  }

  render() {

    return (
      <div class="sixteen campaignListing gray">
        <div class="text-left inline-block full-width">
          <span onClick={this.closeNotification} class="text-right">&times;</span>
        </div>
      </div>
    )
  }
}

export default ActionSaved;
