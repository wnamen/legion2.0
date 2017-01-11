import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class FilterAd extends React.Component {
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
      <div class="sixteen columns gray-light-background text-center filterContainer">
        <div class="twelve columns offset-by-two">
          <h6 class="fH6 pH6 gray">Look Up Millions of People & Companies</h6>
          <h6 class="fH6 smaller gray">Using the Following Filters:</h6>
          <h6 class="fH6 smaller gray">Keywords, Job Title, Company Name, Technology Used, Age, Revenue, Funding, Social Media Profiles, Location, Industry, Interests, Education, Employee Size, & More...</h6>
          <br></br>
          <img class="filterIcon" src="src/img/no_search_results.png"></img>
        </div>
      </div>
    )
  }
}
