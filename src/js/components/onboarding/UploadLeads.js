import React, { Component } from "react";
import cookie           from "react-cookie";
import $ from "jquery";

class UploadLeads extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      file: "__________________",
      upload: false
    };
  }

  onHandleFile = (e) => {
      this.setState({
        file: e.target.files[0],
        upload: true
      });
  };
  
  clear = () => {
    this.setState({
      file: "__________________",
      upload: false
    });
  };
  
  upload = () => {
    let tokenHeader = `Token ${cookie.load("token")}`;
    const {file} = this.state;
    $.post({
      url: "https://api.legionanalytics.com/upload-document",
      headers: {"Authorization": tokenHeader, "Content-Disposition": `attachment; filename=${file.name}`, "Content-Type": "text/csv"},
      processData: false,
      data: file,
      success: (response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    })
  };
  
  render(){
    
    const { file: {name}, upload } = this.state;
    const extraClass = "lgnBtn settingsBtn lgnBtnLg smoothBkgd white inline-block signupBtn";
    return(
      <div>
          <img class="modalIcon smallerIcon" src="/src/img/upload_cloud_asset.png"></img>
          <h1 class="modalTitle gray onbTitle">Upload Your Current Leads</h1>
          <form id="billingModalForm">
            <div class="gray"><small>File: {name}</small></div>
  
            {upload ?
              <div>
                <div class={`${extraClass} green-background`} onClick={this.upload}>Confirm?</div>
                <div class={`${extraClass} red-background`} onClick={this.clear}>Choose Another</div>
              </div>
              
              :
              
              <div class={`${extraClass} electric-blue-background`}
                             style={{
                               position: "relative",
                               cursor: "pointer",
                             }}>
              <input type="file" onChange={this.onHandleFile} accept=".csv" style={{
                opacity: 0,
                cursor: "pointer",
                width: "160px",
                height: "50px",
                fontSize: 0,
                position: "absolute",
                top: 0,
                left: "calc(50% - 80px)",
              }} />
              Upload .CSV
            </div>}
            
          </form>
        </div>
    )
  }
}

export default UploadLeads;

