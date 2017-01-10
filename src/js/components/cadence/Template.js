import React, { Component } from "react";
import { Input } from "react-materialize";
import FroalaEditor from "react-froala-wysiwyg";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
      config: {
        toolbarInline: true,
        charCounterCount: false,
        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontSize', '-', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', 'paragraphFormat', '-', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'quote', 'clearFormatting', 'html', 'insertImage', 'insertLink']
      }
    }
  }
  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render(){
    //RENDER LOGIC HERE

    return(
      <div class="sixteen">
        <div class="gray-border small-border workingTemplate">
            <div class="gray small-bottom-border gray-border workingRow">
              <div class="inline-block">Template Name: </div>
              <div class="inline-block templateNameContainer">
                <Input type='text' name="newTemplateName">
                </Input>
              </div>
              <div class="working chooseTemplate">
                <Input type='select' name="whichEmail" onChange={this.handleSelected}>
                  <option value="">Choose Existing</option>
                  <option value="123455">Follow Up</option>
                  <option value="213445">Missed Call</option>
                  <option value="123435">Break-Up Email</option>
                  <option value="213415">Sandler First Email</option>
                </Input>
              </div>
            </div>
            <div class="gray small-bottom-border gray-border workingRow">
              <div class="inline-block">Subject: </div>
              <div class="inline-block templateNameContainer">
                <Input type='text' name="newSubjectName">
                </Input>
              </div>
            </div>
            <div class="editableText">
              <FroalaEditor
                config={this.state.config}
                tag="textarea"
              />
            </div>
            <div class="gray small-bottom-border gray-border workingRow bottomRow">
              <div class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn saveTempTemp">Save</div>
              <div class="working chooseTemplate pTags">
                <Input type='select' name="whichEmail" onChange={this.handleSelected}>
                  <option value="">Personalized Tags</option>
                  <option value="123455">contact.first_name</option>
                  <option value="213445">contact.last_name</option>
                  <option value="123455">contact.age</option>
                  <option value="213445">contact.city</option>
                  <option value="213445">contact.state</option>
                  <option value="213445">contact.email_address</option>
                  <option value="123435">company.name</option>
                  <option value="213415">company.city</option>
                  <option value="123435">company.state</option>
                  <option value="213415">company.phone_number</option>
                </Input>
              </div>
              <div class="lgnBtn smoothBkgd white-background small-border gray-border clearBtn">Delete</div>
              <i class="fa fa-font tempIcon"></i>
              <a href="#" class="active pushRight sendTestEmail">Send Test Email</a>
            </div>
        </div>
      </div>
    )
  }
}

// noresize
// class="editableText"
// tag="textarea"
// config={this.config}
// model={this.state.model}
// onModelChange={this.handleModelChange}
