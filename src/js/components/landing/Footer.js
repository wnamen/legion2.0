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
          <div><Link to="directory" activeClassName="active">Directory</Link></div>
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
