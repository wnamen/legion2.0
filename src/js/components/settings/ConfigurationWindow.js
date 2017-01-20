import React, { Component } from "react"
import { Input } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class ConfigurationForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let emailData = this.props.details;

    let currentEmail =  emailData.credential_private_key || emailData.credential_handle;

    return(
      <div class="sampleWindow small-border gray-border white-background">
        <table id="configuration">
          <tbody>
            <tr>
              <td class="text-right">From: </td>
              <td class="text-left gray">{ this.props.newName || emailData.credential_api_key} <small> { this.props.newEmail || currentEmail } </small></td>
            </tr>
            <tr>
              <td class="text-right">To: </td>
              <td class="text-left gray">Sinan Ozdemir <small> sinan@legionanalytics.com </small></td>
            </tr>
            <tr>
              <td class="text-right">Date: </td>
              <td class="text-left gray">Tue, Sep 6, 2017 at 12:57pm</td>
            </tr>
            <tr>
              <td class="text-right">Subject: </td>
              <td class="text-left gray">Following Up</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
