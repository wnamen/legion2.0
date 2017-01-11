import React, { Component }       from "react"
import { Link }                   from "react-router"
import $                          from "jquery"

import DirectoryMenu              from "../components/directory/DirectoryMenu"
import DirectoryTable             from "../components/directory/DirectoryTable"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Directory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
      current: {
        directory: "people",
        subDirectory: "a",
        group: "",
      },
      groupView: false
    }
    this.handleSubDirectoryToggle = this.handleSubDirectoryToggle.bind(this);
    this.handleGroupSelection = this.handleGroupSelection.bind(this);
  }

  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT
  handleSubDirectoryToggle(directory, subDirectory) {
    console.log(directory, subDirectory);
    this.setState({current: {directory:directory, subDirectory:subDirectory}, groupView: false});
  }

  handleGroupSelection(group) {
    console.log(group);
    this.setState({groupView: true, current: {group:group}});
  }

  render() {
    //RENDER LOGIC HERE

    return (
      <div class="gray-light-background">
        <div class="sixteen columns">
          <DirectoryMenu onSubDirectoryToggle={this.handleSubDirectoryToggle}/>
          <DirectoryTable current={this.state.current} groupView={this.state.groupView} onGroupSelection={this.handleGroupSelection}/>
        </div>
      </div>
    );
  }
}
