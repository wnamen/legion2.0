import React, { Component } from "react"
import CSSModules from 'react-css-modules'

export default class ContactResults extends React.Component{
  render(){
    return(
      <tr>
        <td>
          <p>{this.props.name}</p>
        </td>

        <td>
          <p>{this.props.jobTitle}</p>
        </td>

        <td>
          <p>{this.props.company}</p>
        </td>

        <td>
          <p>{this.props.employees}</p>
        </td>

        <td>
          <p>{this.props.industry}</p>
        </td>

        <td>
          <p>{this.props.city}</p>
        </td>
      </tr>
    )
  }
}
