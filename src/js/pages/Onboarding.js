import React, { Component }       from "react";
import { Link }                   from "react-router";
import { Button }                 from "react-materialize";

import ConnectEmail               from "../components/onboarding/ConnectEmail";
import UploadLeads                from "../components/onboarding/UploadLeads";
import DataShare                  from "../components/onboarding/DataShare";

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    }
    this.nextStep = this.nextStep.bind(this);
  }

  nextStep = () => {
    this.setState({currentStep: this.state.currentStep += 1})
  }

  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render() {
    return (
      <div class="ten offset-by-three white-background settingsCard">
        <Button onClick={this.nextStep}>Skip</Button>
        { this.state.currentStep === 1 && <ConnectEmail />}
        { this.state.currentStep === 2 && <UploadLeads />}
        { this.state.currentStep === 3 && <DataShare />}
      </div>
    );
  }
}