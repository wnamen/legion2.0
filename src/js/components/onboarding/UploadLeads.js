import React, { Component, PropTypes } from "react";
import $ from "jquery";


class UploadLeads extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: "__________________",
      upload: false,
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

  confirm = () => {
    this.props.uploadCSV(this.state.file, this.state.data)
    this.props.updateMappingStatus();
  }


  render() {

    const { file: { name }, upload} = this.state;
    const extraClass = "lgnBtn settingsBtn lgnBtnLg smoothBkgd white inline-block signupBtn";


    return (
      <div>
        <img class="modalIcon smallerIcon" src="/src/img/upload_cloud_asset.png" />
        <h1 class="modalTitle gray onbTitle">Upload Your Current Leads</h1>
        <form id="billingModalForm">
          <div class="gray">
            <small>File: {name}</small>
          </div>

          {upload ?
            <div>
              <div class={`${extraClass} green-background`} onClick={this.confirm}>Confirm?</div>
              <div class={`${extraClass} red-background`} onClick={this.clear}>Choose Another</div>
            </div>

            :

            <div class={`${extraClass} electric-blue-background file-input`} >

              <input type="file" accept=".csv" id="hiddenInput" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn hidden"></input>
              <a class="contact-upload white" onClick={this.onHandleFile}>Upload .CSV</a>

            </div>}

        </form>
      </div>
    )
  }
}

UploadLeads.contextTypes = {
  http: PropTypes.func.isRequired
};

export default UploadLeads;
