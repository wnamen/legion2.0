import React, { Component } from "react";
import { Input } from "react-materialize";
import $ from "jquery";

export default class TemplateDelay extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelayChange = this.handleDelayChange.bind(this);
  }

  handleDelayChange = (e) => {
    this.props.onDelayChange(e.target.id, e.target.value);
  }

  render(){

    return(
      <div class="sixteen text-center">
        <div class="gray inlineFlex delayAdjuster">
          <div class="preText">If I don't receive a response after </div>
          <input type="number" min="1" max="30" class="delayPicker inline-block" value={this.props.currentDelay} id={this.props.id} onChange={this.handleDelayChange}/> days, then send the following template
        </div>
      </div>
    )
  }
}
