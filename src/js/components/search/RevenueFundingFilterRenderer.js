import React from "react"

export default class RevenueFundingFilterRenderer extends React.Component {
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
