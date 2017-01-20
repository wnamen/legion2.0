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
      }
    }
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleTemplateSave = this.handleTemplateSave.bind(this);
    this.handleRenderSelection = this.handleRenderSelection.bind(this);
  }

  handleModelChange = (html) => {
    this.setState({templateText: html});
  }

  handleNameChange = (e) => {
    this.setState({templateName: e.target.value})
  }

  handleSubjectChange = (e) => {
    this.setState({templateSubject: e.target.value})
  }

  handleTemplateSave = () => {
    let templateChanges = {id: (this.props.data.id || null), templateName: this.state.templateName, templateSubject: this.state.templateSubject, templateText: this.state.templateText};
    this.props.saveTemplate(templateChanges);
  }

  handleRenderSelection = (e) => {
    this.props.templateData.forEach((template) => {
      if (parseInt(e.target.value) === parseInt(template.id)) {
        console.log(template);
        return this.setState({templateName: template.name_of_template, templateSubject: template.subject, templateText: template.html})
      }
    })
  }

  render(){
    let templates = this.props.templateData;
    let mappedTemplates;

    console.log(this.props.data);
    console.log(this.state);

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
                <Input type='text' name="newTemplateName" onChange={this.handleNameChange} value={ this.state.templateName || this.props.data.name_of_template}/>
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
                <Input type='text' name="newSubjectName" onChange={this.handleSubjectChange} value={this.state.templateSubject || this.props.data.subject}>
                </Input>
              </div>
            </div>
            <div class="editableText">
              <FroalaEditor
                tag="textarea"
                config={this.state.config}
                model={this.state.templateText || this.props.data.html}
                onModelChange={this.handleModelChange}
              />
            </div>
            <div class="gray small-bottom-border gray-border workingRow bottomRow">
              <div class="lgnBtn smoothBkgd electric-blue-background saveCampaignBtn saveTempTemp" onClick={this.handleTemplateSave}>Save</div>
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
              <a href="#" class="active pushRight sendTestEmail">Send Test Email</a>
            </div>
        </div>
      </div>
    )
  }
}
