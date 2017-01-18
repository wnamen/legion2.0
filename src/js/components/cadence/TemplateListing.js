import React, { Component } from "react"
import $ from "jquery"

export default class TemplateListing extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let template = this.props.templateData;
    let openRate = 0;
    let clickRate = 0;
    let replyRate = 0;

    if ((template.newest_stats !== null)) {
      openRate = template.newest_stats.statistics.open_rate;
      clickRate = template.newest_stats.statistics.click_rate;
      replyRate = template.newest_stats.statistics.reply_rate;
    }

    return(
      <div class="sixteen campaignListing gray">
        <div class="text-left full-width">
          <div class="templateName">{this.props.templateData.name_of_template}</div>
          <div class="stats">
            <span>{openRate}% </span><img class="tempImg" src="/src/img/open_icon.svg" title="Open Rate"></img>
            <span>{clickRate}% </span><img class="tempImg clickImg" src="/src/img/click_icon.svg" title="Click Through Rate"></img>
            <span>{replyRate}% </span><img class="tempImg" src="/src/img/reply_icon.svg" title="Reply Rate"></img>
          </div>
          <div class="delete">×</div></div>
      </div>
    )
  }
}
