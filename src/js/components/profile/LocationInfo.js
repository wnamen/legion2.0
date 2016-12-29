import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class LocationInfo extends React.Component {
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
      <div class="profile-card whiteCard text-center">
        <img src="src/img/svg/san-francisco.svg" width="100%" class="electric-blue" alt="Kevin Hale lives in San Francisco"></img>
        <h6 class="gray locationH1">Location:<br></br>San Francisco</h6>
      </div>
    )
  }
}
