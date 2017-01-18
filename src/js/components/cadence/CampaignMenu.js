import React, { Component } from "react"
import { Button } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import CampaignListing from "./CampaignListing"

export default class CampaignMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render(){
    //RENDER LOGIC HERE
    let data = this.props.cadenceData;
    let cadences;

    if (data !== undefined) {
      cadences = data.map((cadence, index) => {
        console.log(cadence);
        return (
          <CampaignListing key={index} campaignID={cadence.id} campaignName={cadence.name} campaignStatus={cadence.started} />
        )
      })
    }


    return(
      <div class="sixteen text-left">
        { cadences }
      </div>
    )
  }
}
