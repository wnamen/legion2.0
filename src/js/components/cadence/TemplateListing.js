import React, { Component } from "react"
import $ from "jquery"

export default class TemplateListing extends React.Component {
  constructor(props) {
    super(props);
    this.handleRenderTemplate = this.handleRenderTemplate.bind(this);
    this.handleDeleteTemplate = this.handleDeleteTemplate.bind(this);
  }

  // RENDERS THE SELECTED TEMPLATE
  handleRenderTemplate = (e) => {
    this.props.renderTemplate(e.target.id);
  }

  // DELETES THE SELECTED TEMPLATE
  handleDeleteTemplate = (e) => {
    this.props.deleteTemplate(e.target.id);
  }

  render(){
    let template = this.props.templateData;
    let openRate = 0;
    let clickRate = 0;
    let replyRate = 0;

    if ((template.newest_stats !== null)) {
      openRate = Math.round((template.newest_stats.statistics.open_rate)*100);
      clickRate = Math.round((template.newest_stats.statistics.click_rate)*100);
      replyRate = Math.round((template.newest_stats.statistics.reply_rate)*100);
    }

    return(
      <div class="sixteen campaignListing gray">
        <div class="text-left full-width" id={template.id} onClick={this.handleRenderTemplate}>
          <div class="templateName" id={template.id}>{template.name_of_template}</div>
          <div class="stats" id={template.id}>
            <span id={template.id}>{openRate}% </span><img id={template.id} class="tempImg" src="/src/img/open_icon.svg" title="Open Rate"></img>
            <span id={template.id}>{clickRate}% </span><img id={template.id} class="tempImg clickImg" src="/src/img/click_icon.svg" title="Click Through Rate"></img>
            <span id={template.id}>{replyRate}% </span><img id={template.id} class="tempImg" src="/src/img/reply_icon.svg" title="Reply Rate"></img>
          </div>
          <div class="delete" id={template.id} onClick={this.handleDeleteTemplate}>×</div>
        </div>
      </div>
    )
  }
}
