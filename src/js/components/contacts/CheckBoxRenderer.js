import React, { PropTypes, Component, Children } from 'react';
import { Input } from "react-materialize";

export default class CheckBoxRenderer extends React.Component {
  constructor(props){
    super(props);
    this.handleSelected
  }

  // CAPTURE'S THE ROW ID THAT IS SELECTED
  handleSelected = (e) => {
    console.log(e.target.id);
    this.context.captureSelected(parseInt(e.target.id));
  }

  render(){
    return(
      <span><Input type="checkbox" label=" " id={(this.props.data.id).toString()} onClick={this.handleSelected}/></span>
    )
  }
}

CheckBoxRenderer.contextTypes = {
  captureSelected: PropTypes.func
};
