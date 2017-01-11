import React, { Component } from "react"
import $ from "jquery"

export default class DirectoryListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }

  render(){

    return(
      <div class="sixteen">
        <div class="navbar white-background small-border gray-border text-center fpng">
          <a href="#" class="active">Person's Name</a>
        </div>
      </div>
    )
  }
}
