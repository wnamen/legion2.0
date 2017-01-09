import React, { Component } from "react"
import { Dropdown, NavItem, Input } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class TemplateGenerator extends React.Component {
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
      <div class="sixteen">
        <div class="gray-border small-border tempGen text-center">
            <a href="#" class="active">Create New Template</a>
            <div class="chooseTemplate">
              <Input type='select' name="whichEmail" onChange={this.handleSelected}>
                <option value="">Choose Existing</option>
                <option value="123455">Follow Up</option>
                <option value="213445">Missed Call</option>
                <option value="123435">Break-Up Email</option>
                <option value="213415">Sandler First Email</option>
              </Input>
            </div>
        </div>
      </div>
    )
  }
}
