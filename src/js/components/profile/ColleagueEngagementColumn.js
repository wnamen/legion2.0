import React, { Component } from "react"
import $ from "jquery"

import ColleagueInfo from "./ColleagueInfo"
import EngagementInfo from "./EngagementInfo"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class ColleagueEngagementColumn extends React.Component {
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
      <div class="three columns">
        <ColleagueInfo />
        <EngagementInfo />
      </div>
    )
  }
}
