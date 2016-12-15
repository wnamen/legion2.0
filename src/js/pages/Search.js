import React, { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import ActionBar from "../components/search/ActionBar"
import SearchMenu from "../components/search/SearchMenu"
import ResultsTable from "../components/search/ResultsTable"

import fetchSearch from "../actions/search/searchActions"

@connect((store) => {
  console.log(store);
  return {
    results: store.search.results,
  }
})

export default class Search extends React.Component {
  fetchSearch() {
    this.props.dispatch(fetchSearch())
  }

  render() {
    const { results } = this.props;

    console.log(results);

    return (
      <div class="page-container">
        <div class="row">
          <div class="sixteen columns">
            <SearchMenu />
            <ActionBar />
            <ResultsTable />
          </div>
        </div>
      </div>
    )
  }
}
