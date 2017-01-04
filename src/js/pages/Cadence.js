import React from "react";
import { Link } from "react-router";

import CadenceMenu from "../components/cadence/CadenceMenu"
import CadenceView from "../components/cadence/CadenceView"
import CampaignEngagment from "../components/cadence/CampaignEngagement"

export default class Cadence extends React.Component {

  render() {
    return (
        <div class="gray-light-background">
          <div class="sixteen columns">
            <CadenceMenu />
            <CadenceView />
            <CampaignEngagment />
          </div>
        </div>

    );
  }
}
