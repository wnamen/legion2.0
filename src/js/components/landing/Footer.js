import React, { Component } from "react";
import { IndexLink, Link } from "react-router";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Footer extends React.Component {
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
      <div class="sixteen columns gray-light-background">
        <div class="text-center fpng">
          <div>People Directory :
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
          <div>Company Directory :
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
          <div class="legalRow">
            <Link to="tos" class="directoryLink active">Terms of Service</Link>
            <div class="directoryLink active electric-blue">Copyright © 2014 - 2017 Tier5International, Inc.</div>
            <a href="http://www.twitter2email.com" class="directoryLink active">Twitter2Email</a>
            <a href="mailto:support@legionanalytics.com" class="directoryLink active">support@legionanalytics.com</a>
          </div>
        </div>
      </div>
    )
  }
}
