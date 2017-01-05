import React, { Component } from "react"
import { Input } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class ConfigurationForm extends React.Component {
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
      <div class="twelve columns">
        <div class="emailSelect">
          <div class="gray inline-block">Configure</div>
          <div class="inline-block configureEmail">
            <Input type='select' name="whichEmail" onChange={this.handleSelected}>
            <option value="jamasen@legionanalytics.com">jamasen@legionanalytics.com</option>
            <option value="jamasen@kylie.ai">jamasen@kylie.ai</option>
          </Input>
          </div>
        </div>
        <div class="sampleWindow small-border gray-border white-background">
          <table id="configuration">
            <tbody>
              <tr>
                <td class="text-right">From: </td>
                <td class="text-left gray">Jamasen Rodriguez <small> jamasen@legionanalytics.com </small></td>
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
        <div class="ten columns offset-by-two">
          <table id="configuration">
            <tbody>
              <tr>
                <td class="text-right">Name: </td>
                <td class="text-left gray"><Input type="text" placeholder="Jamasen Rodriguez" class="eight"/></td>
              </tr>
              <tr>
                <td class="text-right">Alias: </td>
                <td class="text-left gray"><Input type="text" placeholder="jamasen@legionanalytics.com" class="eight"/></td>
              </tr>
              <tr>
                <td class="text-right">Primary Account: </td>
                <td class="text-left gray">
                  <Input checked={this.props.checked} onChange={this.socialCheck} name='primary' type='checkbox' label=" " value="0" />
                </td>
              </tr>
              <tr>
                <td class="text-right">Status: </td>
                <td class="text-left gray">Connected</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
