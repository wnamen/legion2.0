import React, { PropTypes } from "react"

const ConfigurationForm = ({ email, newName, newEmail }) => {
  
  let currentEmail = email.credential_private_key || email.credential_handle;
  
  return (
    <div class="sampleWindow small-border gray-border white-background">
      <table id="configuration">
        <tbody>
        <tr>
          <td class="text-right">From:</td>
          <td class="text-left gray">{ newName || email.credential_api_key }
            <small> { newEmail || currentEmail } </small>
          </td>
        </tr>
        <tr>
          <td class="text-right">To:</td>
          <td class="text-left gray">Sinan Ozdemir
            <small> sinan@legionanalytics.com</small>
          </td>
        </tr>
        <tr>
          <td class="text-right">Date:</td>
          <td class="text-left gray">Tue, Sep 6, 2017 at 12:57pm</td>
        </tr>
        <tr>
          <td class="text-right">Subject:</td>
          <td class="text-left gray">Following Up</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
};

export default ConfigurationForm;
