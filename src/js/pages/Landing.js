import React, { Component }       from "react"

import Header                     from "../components/landing/Header"
import PricingAndOptions          from "../components/landing/PricingAndOptions"
import FilterAd                   from "../components/landing/FilterAd"
import Testimonials               from "../components/landing/Testimonials"
import Footer                     from "../components/landing/Footer"


const Landing = () => {
  
  return (
    <div class="gray-light-background">
      <div class="sixteen inline-block">
        <Header />
        <PricingAndOptions />
        <FilterAd />
        <Testimonials />
        <Footer />
      </div>
    </div>
  
  );
};

export default Landing;

