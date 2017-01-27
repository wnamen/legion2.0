import React, { PropTypes, Component, Children } from 'react';
import { IndexLink } from "react-router";
import { Input } from "react-materialize";

export default class EmailLinkRenderer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <a class="active" href={`mailto:${this.props.value}`} target="_blank">{this.props.value}</a>
    )
  }
}
