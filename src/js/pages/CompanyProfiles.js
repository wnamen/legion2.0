import React, { Component }       from "react";
import { Link }                   from "react-router";
import $                          from "jquery";

import CompanyLocationColumn      from "../components/companyProfiles/CompanyLocationColumn";
import CompanyBio                 from "../components/companyProfiles/CompanyBio";
import KylieAdColumn              from "../components/companyProfiles/KylieAdColumn";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE

export default class CompanyProfiles extends React.Component {
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
          <CompanyLocationColumn />
          <CompanyBio />
          <KylieAdColumn />
        </div>
      </div>
    );
  }
}
