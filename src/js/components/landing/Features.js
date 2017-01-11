import React, { Component } from "react"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Features extends React.Component {
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
      <div class="sixteen columns white-background">
        <div class="four columns text-center featureCell">
          <img class="fIcon" src="src/img/no_search_results.png"></img>
          <h6 class="fH6 gray">Search</h6>
          <p class="fp gray">Idenify accurate contact information for multiple roles at your key accounts.</p>
        </div>

        <div class="four columns text-center featureCell">
          <img class="fIcon" src="src/img/build.png"></img>
          <h6 class="fH6 gray">Build</h6>
          <p class="fp gray">Populate your CRM or marketing automation records with data points for each of your personas.</p>
        </div>

        <div class="four columns text-center featureCell">
          <img class="fIcon" src="src/img/connect.png"></img>
          <h6 class="fH6 gray">Connect</h6>
          <p class="fp gray">Coordinate personalized emails to mulitple decision makers at each account, throughout the buyer journey.</p>
        </div>
 
        <div class="four columns text-center featureCell">
          <img class="fIcon" src="src/img/measure.png"></img>
          <h6 class="fH6 gray">Measure</h6>
          <p class="fp gray">View detailed engagement analytics accross each account. Optimize your campaigns and segmentation.</p>
        </div>
      </div>
    )
  }
}
