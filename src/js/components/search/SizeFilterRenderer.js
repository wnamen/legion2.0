import React, { Component } from "react";

class SizeFilterRenderer extends Component {

  constructor(props){
    super(props);
  }

  render(){
    const less_than = '<';
    const data = [
      [0,10],
      [11,50],
      [51,200],
      [201,500],
      [501,1000],
      [1001,5000],
      [5001,10000],
      [10001]
    ]

    const results = [
      `${less_than}10`,
      "11-50",
      "51-200",
      "201-500",
      "501-1,000",
      "1,001-5,000",
      "5,001-10,000",
      "10,000+"
    ]

    const dataPoint = this.props.value;
    let result;

    data.forEach((v,k) => {
      if ((v[0] < parseInt(dataPoint)) && ((parseInt(dataPoint) < v[1]))) {
        return result = results[k];
      } else if ((v[0] === data[data.length-1][0]) && (v[0] < parseInt(dataPoint))){
        return result = results[k];
      }
    })

    return(
      <span>{ result }</span>
    )
  }
}

export default SizeFilterRenderer;
