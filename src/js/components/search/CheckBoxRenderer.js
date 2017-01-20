import React from "react";
import { Input } from "react-materialize";

export default class CheckBoxRenderer extends React.Component {
  constructor(props){
    super(props);
    this.handleSelected
  }

  // CAPTURE'S THE ROW ID THAT IS SELECTED
  handleSelected = (e) => {
    console.log(this.props);
    this.props.captureSelected(e.target.id);
  }

  render(){
    return(
      <span><Input type="checkbox" label=" " id={this.props.data.id} onClick={this.handleSelected}/></span>
    )
  }
}
