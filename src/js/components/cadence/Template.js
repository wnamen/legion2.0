import React, { Component } from "react";
import { Input } from "react-materialize";
import FroalaEditor from "react-froala-wysiwyg";
import $ from "jquery";

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        pluginsEnabled: ['image', 'link', "align", "charCounter", "codeBeautifier", "codeView", "colors", "draggable", "emoticons", "entities", "file", "fontFamily", "fontSize", "fullscreen", "image", "imageManager", "inlineStyle", "lineBreaker", "link", "lists", "paragraphFormat", "paragraphStyle", "quote", "save", "table", "url", "video"],
        quickInsert: false,
        toolbarInline: true,
        toolbarVisibleWithoutSelection: true,
        charCounterCount: false,
        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontSize', '-', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', 'paragraphFormat', '-', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'quote', 'clearFormatting', 'html', 'insertImage', 'insertLink']
      },
      id: null,
      name_of_template: null,
      subject: null,
      html: null
    }
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.onTemplateSave = this.onTemplateSave.bind(this);
    this.handleRenderSelection = this.handleRenderSelection.bind(this);
    this.clearTemplate = this.clearTemplate.bind(this);
    this.handleDelayChange = this.handleDelayChange.bind(this);
    this.handleTestEmail = this.handleTestEmail.bind(this);
  }

  handleDelayChange = (e) => {
    let templateID = this.state.id || this.props.data.id
    this.props.onDelayChange((this.props.dataIndex), parseInt(e.target.value), templateID);
  }

  handleModelChange = (html) => {
    this.setState({html: html});
  }

  handleNameChange = (e) => {
    this.setState({name_of_template: e.target.value})
  }

  handleSubjectChange = (e) => {
    this.setState({subject: e.target.value})
  }

  onTemplateSave = () => {
    let templateChanges = {id: (this.state.id || this.props.data.id), name_of_template: this.state.name_of_template || this.props.data.name_of_template, subject: this.state.subject || this.props.data.subject, html: this.state.html || this.props.data.html};
    this.props.handleTemplateSave(templateChanges)
  }

  handleRenderSelection = (e) => {
    this.props.templateData.forEach((template) => {
      if (parseInt(e.target.value) === parseInt(template.id)) {
        return this.setState({id: template.id, name_of_template: template.name_of_template, subject: template.subject, html: template.html})
      }
    })
  }

  clearTemplate = () => {
    this.setState({name_of_template: " ", subject: " ", html: " "})
  }

  handleTestEmail = () => {
    this.props.sendTestEmail(this.state.id || this.props.data.id);
  }

  render() {
    let templates = this.props.templateData;
    let mappedTemplates;
    let delayValue;

    console.log(this.props.currentDelay);

    if (this.props.currentDelay !== null ) {
      delayValue = this.state.currentDelay || this.props.currentDelay;
    }

    if (templates !== undefined) {
      mappedTemplates = templates.map((template, index) => {
        return (
          <option key={index} value={template.id}>{template.name_of_template}</option>
        )
      })
    }

    $(function() {
      $('div#froala-editor')
        .on('froalaEditor.initialized', function (e, editor) {
          editor.events.bindClick($('body'), 'option#cfn', function () {
            editor.html.insert('{{first_name| there}}');
            editor.events.focus();
          });
        })
    });

    return(
      <div>
        { (this.props.currentDelay > 0) &&
          <div class="sixteen text-center">
            <div class="gray inlineFlex delayAdjuster">
              <div class="preText">If I don't receive a response after </div>
              <input type="number" min="1" max="30" class="delayPicker inline-block" value={delayValue} id={this.props.dataIndex} onChange={this.handleDelayChange}/> days, then send the following template
            </div>
          </div>
        }
        <div class="sixteen">
          <div class="gray-border small-border workingTemplate">
              <div class="gray small-bottom-border gray-border workingRow">
                <div class="inline-block">Template Name: </div>
                <div class="inline-block templateNameContainer">
                  <Input type='text' name="newTemplateName" onChange={this.handleNameChange} value={ this.state.name_of_template || this.props.data.name_of_template}/>
                </div>
                <div class="working chooseTemplate">
                  <Input type='select' name="whichEmail" onChange={this.handleRenderSelection}>
                    <option value="">Choose Existing</option>
                    {mappedTemplates}
                  </Input>
                </div>
              </div>
              <div class="gray small-bottom-border gray-border workingRow">
                <div class="inline-block">Subject: </div>
                <div class="inline-block templateNameContainer">
                  <Input type='text' name="newSubjectName" onChange={this.handleSubjectChange} value={this.state.subject || this.props.data.subject}>
                  </Input>
                </div>
              </div>
              <div class="editableText">
                <FroalaEditor
                  tag="textarea"
                  config={this.state.config}
                  model={this.state.html || this.props.data.html}
                  onModelChange={this.handleModelChange}
                />
              </div>
              <div class="gray small-bottom-border gray-border workingRow bottomRow">
                <div class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn saveTempTemp" onClick={this.onTemplateSave}>Save</div>
                <div class="working chooseTemplate pTags">
                  <Input type='select' name="whichEmail" onChange={this.handleSelected}>
                    <option value="" disabled>Personalized Tags</option>
                    <option class="templateTag" id="cfn" value="contactFirstName">Contact's First Name</option>
                    <option class="templateTag" id="cln" value="contactLastName">Contact's Last Name</option>
                    <option class="templateTag" id="cn" value="companyName">Company Name</option>
                  </Input>
                </div>
                <div class="lgnBtn smoothBkgd white-background small-border gray-border clearBtn" onClick={this.clearTemplate}>Clear</div>
                <a class="active pushRight sendTestEmail" onClick={this.handleTestEmail}>Send Test Email</a>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
