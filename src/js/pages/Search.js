import React from "react"
import { Link } from "react-router"

import ActionBar from "../components/search/ActionBar"
import FilterMenu from "../components/search/FilterMenu"
import Results from "../components/search/Results"

export default class Search extends React.Component {
  render() {
    console.log("search");
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <FilterMenu />
              <ActionBar />
              <Results />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
