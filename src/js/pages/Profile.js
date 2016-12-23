import React, { Component }       from "react"
import { Link }                   from "react-router"
import $                          from "jquery"

import ContactLocationColumn      from "../components/profile/ContactLocationColumn"
import ColleagueEngagementColumn  from "../components/profile/ColleagueEngagementColumn"
import PublicBio                  from "../components/profile/PublicBio"

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class Profile extends React.Component {
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
        <div class="row">
          <div class="sixteen columns">
            <ContactLocationColumn />
            <PublicBio />
            <ColleagueEngagementColumn />
          </div>
        </div>
      </div>
    );
  }
}
