import React, { Component }       from "react";
import { Link }                   from "react-router";
import $                          from "jquery";

import ContactLocationColumn      from "../components/peopleProfiles/ContactLocationColumn";
import ColleagueEngagementColumn  from "../components/peopleProfiles/ColleagueEngagementColumn";
import PublicBio                  from "../components/peopleProfiles/PublicBio";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class PeopleProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }

  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT

  render() {
    //RENDER LOGIC HERE

    return (
      <div class="gray-light-background">
        <div class="sixteen columns">
          <ContactLocationColumn />
          <PublicBio />
          <ColleagueEngagementColumn />
        </div>
      </div>
    );
  }
}
