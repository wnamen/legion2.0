import React, { Component, PropTypes } from "react";


class UploadLeads extends Component {

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
    const { file } = this.state;

    const data = new FormData();
    data.append('file', file);

    this.context.http.post('upload-document', data, {
      'Content-Disposition': `name=${file.name}; filename=${file.name}`,
      'Content-Type': "text/csv"
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });

  };

  render() {

    const { file: { name }, upload } = this.state;
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
              <div class={`${extraClass} green-background`} onClick={this.upload}>Confirm?</div>
              <div class={`${extraClass} red-background`} onClick={this.clear}>Choose Another</div>
            </div>

            :

            <div class={`${extraClass} electric-blue-background file-input`} >
              <input type="file" onChange={this.onHandleFile} accept=".csv" />
              Upload .CSV
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
