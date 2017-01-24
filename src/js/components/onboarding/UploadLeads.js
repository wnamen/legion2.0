import React, { Component, PropTypes } from "react";
import $ from "jquery";

import MapBar           from "./mapping/MapBar";
import MapTable         from "./mapping/MapTable";
import MapResults       from "./mapping/MapResults";

class UploadLeads extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: "__________________",
      upload: false,
      mapping: false
    };
  }

  onHandleFile = (e) => {
    let self = this;
    let path;
    let filename;
    $("#hiddenInput").trigger("click");
    $('#hiddenInput').change(function() {
        let file = $(this)[0].files[0];
        path = $(this).val();
        filename = path.replace(/^.*\\/, "");
        $('.fileName').text(filename);
        self.setState({
          file: filename,
          data: file,
          upload: true
        });
    });
  };

  clear = () => {
    this.setState({
      file: "__________________",
      upload: false
    });
  };

  check = () => {
    console.log(this.state.file, this.state.data, this.state.upload);
  }

  upload = () => {
    const { file, data } = this.state;

    this.context.http.post('upload-document', data, {
      'Content-Disposition': `attachment; filename=${file.name}`,
      'Content-Type': "text/csv"
    })
      .then(res => {
        console.log(res)
        this.setState({
          documentID: res.id,
          importedSample: res.results,
          mappedArray: new Array(res.results.length),
          mapFileName: filename
        })
      })
      .catch(err => {
        console.log(err)
      });
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

    const { file: { name }, upload, mapping} = this.state;
    const extraClass = "lgnBtn settingsBtn lgnBtnLg smoothBkgd white inline-block signupBtn";
    let currentView;

    if (this.state.mapping) {
      currentView = (
        <div class="sixteen columns">
          <MapBar updateMappingStatus={this.updateMappingStatus} filename={this.state.mapFileName} mapCSV={this.mapCSV}/>
          <MapTable contacts={this.state.importedSample} handleCaptureColumn={this.handleCaptureColumn}/>
          <MapResults />
        </div>
      )
    } else {
      currentView = (
        <div>
          <img class="modalIcon smallerIcon" src="/src/img/upload_cloud_asset.png" />
          <h1 class="modalTitle gray onbTitle">Upload Your Current Leads</h1>
          <form id="billingModalForm">
            <div class="gray">
              <small>File: {name}</small>
            </div>

            {upload ?
              <div>
                <div class={`${extraClass} green-background`} onClick={this.upload}>Confirm?</div>
                <div class={`${extraClass} red-background`} onClick={this.clear}>Choose Another</div>
              </div>

              :

              <div class={`${extraClass} electric-blue-background file-input`} >

                <input onChange={this.check} type="file" accept=".csv" id="hiddenInput" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn hidden"></input>
                <a class="contact-upload white" onClick={this.onHandleFile}>Upload .CSV</a>

              </div>}

          </form>
        </div>
      )
    }
    return (
      <div>
        {currentView}
      </div>
    )
  }
}

UploadLeads.contextTypes = {
  http: PropTypes.func.isRequired
};

export default UploadLeads;
