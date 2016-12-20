import React, { Component } from "react"
import { Input } from 'react-materialize'
import CSSModules from 'react-css-modules'

export default class Results extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    }
    this.checkIt = this.checkIt.bind(this);
  }

  checkIt() {
    this.props.callback(this.props.index, !this.props.checked);
    return;
  }

  render(){
    return(
      <tr class="results-row small-bottom-border gray-border">
        <td class="table-selector">
          <Input name='selector' type='checkbox' value='select' class="table-content-styles" label=" " checked={this.props.checked} onChange={this.checkIt} />
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
        <td></td>
      </tr>
    )
  }
}
