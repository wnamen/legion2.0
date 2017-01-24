import React, { Component }       from "react";
import cookie           from "react-cookie";

import ConnectEmail               from "../components/onboarding/ConnectEmail";
import UploadLeads                from "../components/onboarding/UploadLeads";
import DataShare                  from "../components/onboarding/DataShare";

import MapBar           from "../components/onboarding/mapping/MapBar";
import MapTable         from "../components/onboarding/mapping/MapTable";
import MapResults       from "../components/onboarding/mapping/MapResults";

class Onboarding extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load("token"),
      currentStep: 1,
      mapping: false,
    };
    this.upload = this.upload.bind(this);
    this.mapCSV = this.mapCSV.bind(this);
    this.updateMappingStatus = this.updateMappingStatus.bind(this);
    this.handleCaptureColumn = this.handleCaptureColumn.bind(this);
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

  upload = (filename, file) => {
    let tokenHeader = `Token ${this.state.token}`;
    $.post({
      url: "https://api.legionanalytics.com/upload-document",
      headers: {"Authorization": tokenHeader, "Content-Disposition": `attachment; filename=${filename}`, "Content-Type": "text/csv"},
      data: file,
      processData: false,
      success: (response) => {
        this.setState({
          documentID: response.id,
          importedSample: response.results,
          mappedArray: new Array(response.results.length),
          mapFileName: filename,
          mapping: true
        })
      },
      error: (response) => {
      }
    })
  };

  mapCSV = () => {
    let tokenHeader = `Token ${this.state.token}`;

    $.post({
      url: "https://api.legionanalytics.com/update-document",
      headers: {"Authorization": tokenHeader},
      data: {document_id: this.state.documentID, document_head: this.state.mappedArray},
      success: (response) => {
        this.setState({
          notification: {success: true},
          message: "Your list has been imported successfully and your contacts will be updated shortly."
        })
      },
      error: (response) => {
      }
    })
  }

  // CAPTURE MAPPED COLUMNS
  handleCaptureColumn = (column, value) => {
    let mappedArray = this.state.mappedArray;
    mappedArray[column] = value;
    this.setState({mappedArray});
  }

  // TOGGLE FOR MAPPING NEW CSVS
  updateMappingStatus = () => {
    this.state.mapping ? this.setState({mapping: !this.state.mapping}) : this.setState({mapping: !this.state.mapping, mappedColumns: {}});
  }


  render() {

    const {currentStep, mapping} = this.state;
    let currentView;

    if (mapping) {
      currentView = (
        <div class="sixteen columns">
          <MapBar updateMappingStatus={this.updateMappingStatus} filename={this.state.mapFileName} mapCSV={this.mapCSV}/>
          <MapTable contacts={this.state.importedSample} handleCaptureColumn={this.handleCaptureColumn}/>
          <MapResults />
        </div>
      )
    } else {
      currentView = (
        <div className="ten offset-by-three white-background onboardingCard">
          { currentStep === 3 ? "" : <div className="skipBtn electric-blue"  onClick={this.nextStep}>Skip</div> }

            <div class="sixteen columns">
              <div class="nine columns onbMargin text-center">
                { currentStep === 1 && <ConnectEmail />}
                { currentStep === 2 && <UploadLeads updateMappingStatus={this.updateMappingStatus} uploadCSV={this.upload}/>}
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
      )
    }

    return (
      <div>
        { currentView }
      </div>
    );
  }
}

export default Onboarding;
