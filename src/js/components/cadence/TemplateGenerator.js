import React, { Component } from "react"
import { Dropdown, NavItem, Input } from "react-materialize"
import $ from "jquery"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class TemplateGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name_of_template: "",
      subject: "",
      html: ""
    }
    this.handleRenderSelection = this.handleRenderSelection.bind(this);
    this.appendNewTemplate = this.appendNewTemplate.bind(this);
  }
  handleRenderSelection = (e) => {
    this.props.templateData.forEach((template) => {
      if (parseInt(e.target.value) === parseInt(template.id)) {
        console.log(template);
        return this.setState({name_of_template: template.name_of_template, subject: template.subject, html: template.html})
      }
    })
  }

  appendNewTemplate = () => {
    let templates = this.props.currentTemplates;
    templates.push(this.state)
    console.log(templates);
    this.props.onAppendTemplate(templates);
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
        <div class="gray-border small-border tempGen text-center">
            <a class="active" onClick={this.appendNewTemplate}>Create New Template</a>
            <div class="chooseTemplate">
              <Input type='select' name="whichEmail" onChange={this.handleRenderSelection}>
                <option value="">Choose Existing</option>
                {mappedTemplates}
              </Input>
            </div>
        </div>
      </div>
    )
  }
}
