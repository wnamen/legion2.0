import React, { Component } from "react"
import CSSModules from 'react-css-modules'

export default class Results extends React.Component{
  render(){
    console.log(this.props);
    return(
      <tr class="small-bottom-border gray-border">
        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.name}</p>
        </td>

        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.jobTitle}</p>
        </td>

        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.company}</p>
        </td>

        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.employees}</p>
        </td>

        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.industry}</p>
        </td>

        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.city}</p>
        </td>
      </tr>
    )
  }
}
