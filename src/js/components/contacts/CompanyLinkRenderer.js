import React, { PropTypes, Component, Children } from 'react';
import { IndexLink } from "react-router";
import { Input } from "react-materialize";

export default class CellCompanyLinkRenderer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <IndexLink class="active" to={`/profiles/company/${this.props.data.company_id}`}>{this.props.value}</IndexLink>
    )
  }
}
