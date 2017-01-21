import React, { Component } from "react";
import { Input } from "react-materialize";
import $ from "jquery";

export default class TemplateDelay extends React.Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange = (e) => {
    this.setState({day: e.target.value});
  }

  render(){

    return(
      <div class="sixteen text-center">
        <div class="gray inlineFlex delayAdjuster">
          <div class="preText">If I don't receive a response after </div>
          <input type="number" min="1" max="30" class="delayPicker inline-block" /> days, then send the following template
        </div>
      </div>
    )
  }
}
