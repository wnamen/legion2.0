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

    )
  }
}
