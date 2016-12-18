import React, { Component } from "react"
import { Input } from 'react-materialize'
import CSSModules from 'react-css-modules'

export default class Results extends React.Component{
  render(){
    return(
      <tr class="small-bottom-border gray-border">
        <td class="table-row-styles">
          <Input name='selector' type='checkbox' value='select' class="table-content-styles"/>
        </td>

        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.name}</p>
        </td>

        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.age}</p>
        </td>

        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.jobTitle}</p>
        </td>

        <td class="table-row-styles">
          <p class="table-content-styles">{this.props.companyName}</p>
        </td>
      </tr>
    )
  }
}
