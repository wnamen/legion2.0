import React, { Component } from "react"
import $ from "jquery"

export default class DirectoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handlePeopleClick = this.handlePeopleClick.bind(this);
    this.handleCompanyClick = this.handleCompanyClick.bind(this);
  }

  handlePeopleClick(e) {
    e.preventDefault();
    let val = e.target.text;

    if (val !== undefined) {
      this.props.onSubDirectoryToggle('people', val);
    }
  }

  handleCompanyClick(e) {
    e.preventDefault();
    let val = e.target.text;

    if (val !== undefined) {
      this.props.onSubDirectoryToggle('company', val);
    }
  }

  render(){

    return(
      <div class="sixteen">
        <div class="navbar text-center fpng">
          <div onClick={this.handlePeopleClick}>People Directory :
            <a href="#" class="directoryLink active">A</a>
            <a href="#" class="directoryLink active">B</a>
            <a href="#" class="directoryLink active">C</a>
            <a href="#" class="directoryLink active">D</a>
            <a href="#" class="directoryLink active">E</a>
            <a href="#" class="directoryLink active">F</a>
            <a href="#" class="directoryLink active">G</a>
            <a href="#" class="directoryLink active">H</a>
            <a href="#" class="directoryLink active">I</a>
            <a href="#" class="directoryLink active">J</a>
            <a href="#" class="directoryLink active">K</a>
            <a href="#" class="directoryLink active">L</a>
            <a href="#" class="directoryLink active">M</a>
            <a href="#" class="directoryLink active">N</a>
            <a href="#" class="directoryLink active">O</a>
            <a href="#" class="directoryLink active">P</a>
            <a href="#" class="directoryLink active">Q</a>
            <a href="#" class="directoryLink active">R</a>
            <a href="#" class="directoryLink active">S</a>
            <a href="#" class="directoryLink active">T</a>
            <a href="#" class="directoryLink active">U</a>
            <a href="#" class="directoryLink active">V</a>
            <a href="#" class="directoryLink active">W</a>
            <a href="#" class="directoryLink active">X</a>
            <a href="#" class="directoryLink active">Y</a>
            <a href="#" class="directoryLink active">Z</a>
          </div>
          <div onClick={this.handleCompanyClick}>Company Directory :
            <a href="#" class="directoryLink active">A</a>
            <a href="#" class="directoryLink active">B</a>
            <a href="#" class="directoryLink active">C</a>
            <a href="#" class="directoryLink active">D</a>
            <a href="#" class="directoryLink active">E</a>
            <a href="#" class="directoryLink active">F</a>
            <a href="#" class="directoryLink active">G</a>
            <a href="#" class="directoryLink active">H</a>
            <a href="#" class="directoryLink active">I</a>
            <a href="#" class="directoryLink active">J</a>
            <a href="#" class="directoryLink active">K</a>
            <a href="#" class="directoryLink active">L</a>
            <a href="#" class="directoryLink active">M</a>
            <a href="#" class="directoryLink active">N</a>
            <a href="#" class="directoryLink active">O</a>
            <a href="#" class="directoryLink active">P</a>
            <a href="#" class="directoryLink active">Q</a>
            <a href="#" class="directoryLink active">R</a>
            <a href="#" class="directoryLink active">S</a>
            <a href="#" class="directoryLink active">T</a>
            <a href="#" class="directoryLink active">U</a>
            <a href="#" class="directoryLink active">V</a>
            <a href="#" class="directoryLink active">W</a>
            <a href="#" class="directoryLink active">X</a>
            <a href="#" class="directoryLink active">Y</a>
            <a href="#" class="directoryLink active">Z</a>
          </div>
        </div>
      </div>
    )
  }
}
