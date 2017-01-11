import React, { Component } from "react";
import { Button } from "react-materialize";
import $ from "jquery";

export default class UploadLeads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
    this.clickTrigger = this.clickTrigger.bind(this)
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT
    clickTrigger(e){
      var holder;
      var filename;
      $("#hiddenInput").trigger("click");
      $('#hiddenInput').change(function() {
          holder = $(this).val();
          filename = holder.replace(/^.*\\/, "");
          $('.fileName').text(filename);
          $("#ourInput").text("Confirm?").addClass("green-background");
          $("#redoInput").removeClass("hidden");
      });
      $("#redoInput").on("click",function(){
        $(this).addClass("hidden");
        $("#ourInput").text("Upload .CSV").removeClass("green-background");
      })
    }
  render(){
    //RENDER LOGIC HERE

    return(
      <div class="sixteen columns">
        <div class="nine columns onbMargin text-center">
          <img class="modalIcon smallerIcon" src="/src/img/upload_cloud_asset.png"></img>
          <h1 class="modalTitle gray onbTitle">Upload Your Current Leads</h1>
          <form id="billingModalForm" class="">
            <div class="gray"><small>File: <span class="fileName">_______</span></small></div>
            <div onClick={this.clickTrigger} id="ourInput" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn">Upload .CSV</div>
            <div id="redoInput" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd red-background white inline-block signupBtn hidden">Choose Another</div>
            <input type="file" accept=".csv" id="hiddenInput" class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn hidden"></input>
          </form>
          <div>
            <i class="fa fa-circle billingOpenPagination" aria-hidden="true"></i>
            <i class="fa fa-circle billingClosedPagination" aria-hidden="true"></i>
            <i class="fa fa-circle billingOpenPagination" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}
