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
      name_of_template: null,
      subject: null,
      html: null
    }
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleTemplateSave = this.handleTemplateSave.bind(this);
    this.handleRenderSelection = this.handleRenderSelection.bind(this);
    this.clearTemplate = this.clearTemplate.bind(this);
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

  handleTemplateSave = () => {
    let templateChanges = {id: (this.props.data.id || null), name_of_template: this.state.name_of_template, subject: this.state.subject, html: this.state.html};
    this.props.saveTemplate(templateChanges);
  }

  handleRenderSelection = (e) => {
    this.props.templateData.forEach((template) => {
      if (parseInt(e.target.value) === parseInt(template.id)) {
        return this.setState({name_of_template: template.name_of_template, subject: template.subject, html: template.html})
      }
    })
  }

  clearTemplate = () => {
    this.setState({name_of_template: " ", subject: " ", html: " "})
  }

  render(){
    let templates = this.props.templateData;
    let mappedTemplates;

    if (templates !== undefined) {
      mappedTemplates = templates.map((template, index) => {
        return (
          <option key={index} value={template.id}>{template.name_of_template}</option>
        )
      })
    }

    return(
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
              <div class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn saveTempTemp" onClick={this.handleTemplateSave}>Save</div>
              <div class="working chooseTemplate pTags">
                <Input type='select' name="whichEmail" onChange={this.handleSelected}>
                  <option value="">Personalized Tags</option>
                  <option value="first_name">contact.first_name</option>
                  <option value="last_name">contact.last_name</option>
                  <option value="age">contact.age</option>
                  <option value="city">contact.city</option>
                  <option value="state">contact.state</option>
                  <option value="email_address">contact.email_address</option>
                  <option value="company_name">company.name</option>
                  <option value="company_city">company.city</option>
                  <option value="company_state">company.state</option>
                  <option value="company_phone_number">company.phone_number</option>
                </Input>
              </div>
              <div class="lgnBtn smoothBkgd white-background small-border gray-border clearBtn" onClick={this.clearTemplate}>Clear</div>
              <a href="#" class="active pushRight sendTestEmail">Send Test Email</a>
            </div>
        </div>
      </div>
    )
  }
}
