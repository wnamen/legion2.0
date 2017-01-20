import React, { Component } from "react"
import $ from "jquery"

import TemplateListing from "./TemplateListing"

export default class TemplateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    let data = this.props.templateData;
    let templates;

    // MAP ALL TEMPLATES TO VIEW
    if (data !== undefined) {
      templates = data.map((template, index) => {
        return (
          <TemplateListing key={index} templateID={template.id} templateData={template}  renderTemplate={this.props.renderTemplate} deleteTemplate={this.props.deleteTemplate}/>
        )
      })
    }

    return(
      <div class="sixteen text-left menu-container">
        { templates }
      </div>
    )
  }
}
