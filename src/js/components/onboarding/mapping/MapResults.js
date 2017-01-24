import React, { Component } from "react"

export default class MapResults extends React.Component{
  render(){
    let resultRow = this.props.contact;
    let cell;

    if (resultRow !== undefined) {
      cell = resultRow.map((column,index) => {
        return (
          <td>
            <p key={index} class="map-cell">{column}</p>
          </td>
        )
      })
    }

    return(
      <tr class="small-bottom-border gray-light-border">
        { cell }
      </tr>
    )
  }
}
