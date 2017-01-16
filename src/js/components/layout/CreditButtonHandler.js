import React from "react";
import cookie from "react-cookie";

export default class CreditButtonHandler extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: cookie.load("token"),
      selected: false
    }
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection = (e) => {
    if (this.state.selected) {
      let tokenHeader = `Token ${this.state.token}`;
      console.log("purchased");

      $.post({
        url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/purchase-credits",
        headers: {"Authorization": tokenHeader },
        data: {num_credits: this.props.credits, amount_in_dollars: this.props.cost},
        success: (response) => {
          console.log(response);
          this.props.loadCurrentCredits();
        },
        error: (response) => {
          console.log(response);
        }

      })
    }
    this.setState({selected: !this.state.selected});
  }

  render = () => {

    if (this.state.selected) {
      return (
        <button onClick={this.handleSelection} class="credit-button green-background white">Confirm</button>
      )
    } else {
      return (
        <button onClick={this.handleSelection} class="credit-button electric-blue-background white">Buy</button>
      )
    }

    return (
      { buttonRender }
    );
  }
}
