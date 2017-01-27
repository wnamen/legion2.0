import React, { PropTypes, Component, Children } from 'react';
import { IndexLink } from "react-router";
import { Input } from "react-materialize";

export default class CellContactLinkRenderer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.data);
    return(
      <a class="active" href={this.props.value} target="_blank">{this.props.value}</a>
    )
  }
}
