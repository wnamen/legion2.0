import React, { Component }       from "react"
import { Link }                   from "react-router"
import $                          from "jquery"

import Header                     from "../components/landing/Header"
import PricingAndOptions          from "../components/landing/PricingAndOptions"
import FilterAd                   from "../components/landing/FilterAd"
import Testimonials               from "../components/landing/Testimonials"
import Footer                     from "../components/landing/Footer"


export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }

  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render() {
    return (
      <div class="gray-light-background">
        <div class="sixteen">
          <Header />
          <PricingAndOptions />
          <FilterAd />
          <Testimonials />
          <Footer />
        </div>
      </div>

    );
  }
}
