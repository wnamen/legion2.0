import React from "react";
import { Input } from "react-materialize";

export default class CheckBoxRenderer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    return(
      <span><Input type="checkbox" label=" "/></span>
    )
  }
}
