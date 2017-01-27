import React, { Component } from "react"

class RevenueFundingFilterRenderer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const less_than = '<';
    const data = [
      [0,500000],
      [500000,1000000],
      [1000000,5000000],
      [5000000,10000000],
      [10000000,25000000],
      [25000000,35000000],
      [35000000,50000000],
      [50000000,75000000],
      [75000000,100000000],
      [100000000,200000000],
      [200000000,500000000],
      [500000000,1000000000],
      [1000000000]
    ]

    const results = [
      `${less_than}$500K`,
      "$500K-$1M",
      "$1M-$5M",
      "$5M-$10M",
      "$10M-$25M",
      "$25M-$35M",
      "$35M-$50M",
      "$50M-$75M",
      "$75M-$100M",
      "$100M-$200M",
      "$200M-$500M",
      "$500M-$1B",
      "$1B+"
    ]

    let dataPoint = this.props.value;
    let result;

    data.forEach((v,k) => {
      dataPoint = dataPoint.replace(/\,/g,'')
      if ((v[0] < parseInt(dataPoint,10)) && ((parseInt(dataPoint,10) < v[1]))) {
        return result = results[k];
      } else if ((v[0] === data[data.length-1][0]) && (v[0] < parseInt(dataPoint,10))){
        return result = results[k];
      }
    })
    return(
      <span>{ result }</span>
    )
  }
}

export default RevenueFundingFilterRenderer;
