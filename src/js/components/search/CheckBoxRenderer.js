import React, { PropTypes, Component, Children } from 'react';
import { Input } from "react-materialize";


class CheckBoxRenderer extends React.Component {
  
  constructor(props){
    super(props);
  }
  
  handleSelected = (e) => {
    this.context.captureSelected(e.target.id);
  };

  render(){
    return(
      <span><Input type="checkbox" label=" " id={this.props.data.id} onClick={this.handleSelected}/></span>
    )
  }
}

CheckBoxRenderer.contextTypes = {
  captureSelected: PropTypes.func
};


export default CheckBoxRenderer;

