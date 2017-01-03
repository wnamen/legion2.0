import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Testimonials extends React.Component {
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
      <div class="sixteen columns white-background text-center">
        <br></br>
        <br></br>
        <h6 class="fH6 smaller gray-medium-1">Trusted by Sales Reps Everywhere</h6>
        <div class="eight columns offset-by-four">
          <img class="clicon" src="src/img/c1.png"></img>
          <img class="clicon" src="src/img/c2.png"></img>
          <img class="clicon" src="src/img/c3.png"></img>
          <img class="clicon" src="src/img/c4.png"></img>
        </div>
      </div>
    )
  }
}
