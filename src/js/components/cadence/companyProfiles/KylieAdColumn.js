import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class ColleagueInfo extends React.Component {
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
      <div class="three columns noShow">
        <div class="profile-card whiteCard" id="kylieCard">
          <a href="https://www.kylie.ai" target="_blank">
            <img src="src/img/kylieAd.png" class="kylieAd"></img>
          </a>
        </div>
      </div>
    )
  }
}
