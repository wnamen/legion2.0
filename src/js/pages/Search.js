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
      apiState: {
        people: true,
        companies: false
      },
      results: [],
      industrySuggestions: [],
      interestSuggestions: [],
      technologySuggestions: [],
      checkedAll: false,
      rowState: []
    }
    this.setApiState = this.setApiState.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleIndustrySearch = this.handleIndustrySearch.bind(this);
    this.handleInterestSearch = this.handleInterestSearch.bind(this);
    this.handleTechnologySearch = this.handleTechnologySearch.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.checkRow = this.checkRow.bind(this);
  }

  setApiState(current_state) {
    console.log(current_state);
    let people = !this.state.apiState.people;
    let companies = !this.state.apiState.companies;

    console.log(people);
    console.log(companies);

    this.setState({
      apiState: {
        people: people,
        companies: companies
      }
    })

    console.log(this.state.apiState);
  }

  setRowState(results) {
    let rowState =[];

    if (results !== undefined) {
      results.results.forEach((results, index) => {
        rowState[index] = false
      })
    }
    console.log(rowState);
    this.setState({ rowState: rowState })
  }

  checkRow(id,value) {
    this.state.rowState[id] = value;
    if (this.state.checkAll) {
      this.state.checkAll = !this.state.checkAll;
    }
    this.setState({
      rowState: this.state.rowState,
      checkAll: this.state.checkAll
    });
  }

  checkAll() {
    let rowState =[];
    let checkState = !this.state.checkAll;

    this.state.rowState.forEach((results, index) => {
      rowState[index] = checkState;
    })

    this.state.checkAll = checkState;

    this.setState({
      rowState: rowState,
      checkAll: this.state.checkAll
    });
  }

  componentWillMount(){
    $.ajax({
      url:'https://apidev.legionanalytics.com/api/people/?format=json&page_size=50',
      dataType:'json',
      cache:false,
      success:function(results){
        this.setRowState(results);
        this.setState({results:results});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });

    $.ajax({
      url: 'https://apidev.legionanalytics.com/api/industries/?format=json&page_size=100',
      dataType:'json',
      cache:false,
      success:function(industries){
        this.setState({industrySuggestions: industries});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });

    $.ajax({
      url: 'https://apidev.legionanalytics.com/api/interests/?format=json&page_size=100',
      dataType:'json',
      cache:false,
      success:function(interests){
        this.setState({interestSuggestions: interests});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });

    $.ajax({
      url: 'https://apidev.legionanalytics.com/api/technologies/?format=json&page_size=100',
      dataType:'json',
      cache:false,
      success:function(technologies){
        this.setState({technologySuggestions: technologies});
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

  handleIndustrySearch(query) {
    query = query.text

    $.ajax({
      url:`https://apidev.legionanalytics.com/api/industries/?format=json&page_size=50&${query}`,
      dataType:'json',
      cache:false,
      success:function(industries){
        this.setState({industrySuggestions: industries});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  handleInterestSearch(query) {
    query = query.text

    $.ajax({
      url:`https://apidev.legionanalytics.com/api/interests/?format=json&page_size=50&${query}`,
      dataType:'json',
      cache:false,
      success:function(interests){
        this.setState({interestSuggestions: interests});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  handleTechnologySearch(query) {
    query = query.text

    $.ajax({
      url:`https://apidev.legionanalytics.com/api/technologies/?format=json&page_size=50&${query}`,
      dataType:'json',
      cache:false,
      success:function(technologies){
        this.setState({technologySuggestions: technologies});
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
            <SearchMenu industrySuggestions={this.state.industrySuggestions} interestSuggestions={this.state.interestSuggestions} technologySuggestions={this.state.technologySuggestions} apiState={this.state.apiState} setApiState={this.setApiState} onSearchChange={this.handleSearch} onIndustrySearch={this.handleIndustrySearch} onTechnologySearch={this.handleTechnologySearch} onInterestSearch={this.handleInterestSearch}/>
            <ActionBar results={this.state.results}/>
            <ResultsTable results={this.state.results} rowState={this.state.rowState} checkedAll={this.state.checkedAll} checkAll={this.checkAll} checkRow={this.checkRow}/>
          </div>
        </div>
      </div>
    )
  }
}
