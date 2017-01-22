import React, { Component }       from "react";
import ConnectEmail               from "../components/onboarding/ConnectEmail";
import UploadLeads                from "../components/onboarding/UploadLeads";
import DataShare                  from "../components/onboarding/DataShare";


class Onboarding extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    };
  }

  nextStep = () => {
    this.setState({
      currentStep: this.state.currentStep += 1
    })
  };
  
  onHandleToggle = (v) => {
    this.setState({
      currentStep: v
    })
  };

  render() {
    
    const {currentStep} = this.state;
    
    return (
      <div className="ten offset-by-three white-background onboardingCard">
        { currentStep === 3 ? "" : <div className="skipBtn electric-blue"  onClick={this.nextStep}>Skip</div> }
  
          <div class="sixteen columns">
            <div class="nine columns onbMargin text-center">
              { currentStep === 1 && <ConnectEmail />}
              { currentStep === 2 && <UploadLeads />}
              { currentStep === 3 && <DataShare />}
  
              <div>
                {[1,2,3].map(v => <i key={v}
                  class={`fa fa-circle ${currentStep === v ? `billingClosedPagination` : `billingOpenPagination`}`}
                  style={{cursor: "pointer"}}
                  onClick={this.onHandleToggle.bind(null, v)}
                /> )}
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Onboarding;
