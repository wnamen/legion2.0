import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render(){
    //RENDER LOGIC HERE

    return(
      <div class="sixteen columns">
        <h5 class="settingsSubTitles">My Account</h5>
        <table>
          <tbody class="myAccountTable">
            <tr>
              <td class="text-right gray">Name: </td>
              <td class="text-left gray">Jamasen Rodriguez</td>
            </tr>
            <tr>
              <td class="text-right gray">Email: </td>
              <td class="text-left gray">jamasen@legionanalytics.com</td>
            </tr>
            <tr>
              <td class="text-right newPassword electric-blue">Get New Password</td>
              <td class="text-left"></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
