import React, { Component } from "react"

class RevenueFundingFilterRenderer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let data = this.props.value;

    return(
      <span>{ data }</span>
    )
  }
}

export default RevenueFundingFilterRenderer;
