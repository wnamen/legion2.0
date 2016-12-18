import React, { Component } from "react"
import { Link } from "react-router"
import $ from "jquery"

import ActionBar from "../components/search/ActionBar"
import SearchMenu from "../components/search/SearchMenu"
import ResultsTable from "../components/search/ResultsTable"

export default class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      results: []
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount(){
    $.ajax({
      url:'https://apidev.legionanalytics.com/api/people/?format=json&page_size=50',
      dataType:'json',
      cache:false,
      success:function(results){
        console.log(results);
        this.setState({results:results});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });

  }

  handleSearch(query) {
    query = query.text
    console.log(query);

    $.ajax({
      url:`https://apidev.legionanalytics.com/api/people/?format=json&page_size=50&${query}`,
      dataType:'json',
      cache:false,
      success:function(results){
        console.log(results);
        this.setState({results:results});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });

  }

  render() {
    return (
      <div class="page-container gray-light-background">
        <div class="row">
          <div class="sixteen columns">
            <SearchMenu onSearchChange={this.handleSearch}/>
            <ActionBar />
            <ResultsTable results={this.state.results}/>
          </div>
        </div>
      </div>
    )
  }
}
