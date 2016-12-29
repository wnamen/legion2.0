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
      <div>
        <div class="profile-card whiteCard" id="kylieCard">
          <a href="https://www.kylie.ai" target="_blank">
            <img src="src/img/kylieAd.png" class="kylieAd"></img>
          </a>
        </div>

        <div class="profile-card colleagues">
          <h6 class="black">Colleagues</h6>
          <a href="#" class="active">Kat Mañalac, Partner</a>
          <a href="#" class="active">Quasar Younis, Partner & COO </a>
          <a href="#" class="active">Sam Altman, Partner & President</a>
          <a href="#" class="active">Matt Krisolof, Managing Director of Basic Income Project</a>
          <a href="#" class="active">Kat Mañalac, Partner</a>
          <a href="#" class="active">Kat Mañalac, Partner</a>
        </div>
      </div>
    )
  }
}
