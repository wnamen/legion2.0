import React from "react"

export default class CheckMarkRenderer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let data = this.props.value;
    let result
    if (data) {
      result = <i class="fa fa-check" aria-hidden="true"></i>;
    }
    return(
      <span>{ result }</span>
    )
  }
}
