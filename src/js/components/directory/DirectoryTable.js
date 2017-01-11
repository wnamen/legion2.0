import React, { Component } from "react";
import $ from "jquery";

import DirectoryListings from "./DirectoryListings";

export default class DirectoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
      sections: 'abcdefghijklmnopqrstuvwxyz'.split('')
    }
    this.handleGroupClick = this.handleGroupClick.bind(this);
  }

  handleGroupClick(e) {
    e.preventDefault();
    let val = e.target.text;

    if (val !== undefined) {
      this.props.onGroupSelection(val);
    }
  }

  render(){
    console.log(this.state.sections);
    console.log(this.props.current);
    let sections = this.state.sections;
    let current = this.props.current;
    let mappedSections = [];
    console.log(this.props.groupView);

    if (this.props.groupView === false) {
      mappedSections = sections.map((section, idx) => {
        return (<div key={`${current.subDirectory}${idx}`} onClick={this.handleGroupClick} class="subDirectoryContainer"><a>{(current.subDirectory).toUpperCase()}{section.toUpperCase()}</a></div>)
      })
    }

    return(
      <div class="sixteen">
        <div class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <div style={{"columnCount":2}}>
            { this.props.groupView ? <DirectoryListings /> : mappedSections }
          </div>
        </div>
      </div>
    )
  }
}
