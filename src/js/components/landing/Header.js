import React, { Component } from "react"
import $ from "jquery"

import CallToAction from "./CallToAction"
import Features from "./Features"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Header extends React.Component {
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
      <div class="sixteen">
        <section class="hero electric-blue-light-background text-center">
          <h1 class="hh heroH1">Lead Generation & Outreach</h1>
          <h3 class="hh heroH3">powered by Machine Learning</h3>
          <h6 class="gray text-center hh heroH6">Create an account now and <br></br> instantly receive $100 in credits</h6>
          <CallToAction />
        </section>

        <Features />
      </div>
    )
  }
}
