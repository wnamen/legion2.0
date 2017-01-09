import React, { Component } from "react"

export default class MapResults extends React.Component{
  render(){
    let resultColumn = []
    console.log(this.props);

    return(
      <tr class="small-bottom-border gray-light-border">
        <td>
          <p class="map-cell">{this.props.name}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.jobTitle}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.company}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.employees}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.industry}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.city}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.age}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.education}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.interests}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.phone}</p>
        </td>

        <td>
          <p class="map-cell">{this.props.email}</p>
        </td>
      </tr>
    )
  }
}
