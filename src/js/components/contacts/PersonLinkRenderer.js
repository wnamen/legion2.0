import React, { PropTypes, Component, Children } from 'react';
import { IndexLink } from "react-router";
import { Input } from "react-materialize";

export default class PersonLinkRenderer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <IndexLink class="active" to={`/profiles/person/${this.props.data.id}`}>{this.props.value}</IndexLink>
    )
  }
}
