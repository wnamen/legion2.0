import React, { Component }   from "react"
import { Link }               from "react-router"
import { CubeGrid }           from "better-react-spinkit"
import $                      from "jquery"

import ActionBar              from "../components/search/ActionBar"
import SearchMenu             from "../components/search/SearchMenu"
import ResultsTable           from "../components/search/ResultsTable"

export default class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      apiState: {
        people: true,
        companies: false
      },
      results: [],
      resultsArray: [],
      checkedAll: false,
      rowState: []
    }
    this.setApiState = this.setApiState.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.nextSearch = this.nextSearch.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.checkRow = this.checkRow.bind(this);
  }

  setApiState() {
    this.setState({
      apiState: {
        people: !this.state.apiState.people,
        companies: !this.state.apiState.companies
      }
    })
  }

  setRowState(results) {
    let rowState =[];

    if (results !== undefined) {
      results.results.forEach((results, index) => {
        rowState[index] = false
      })
    }
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
    this.setState({loading:true});
    let current_state = this.state.apiState.people ? "people" : "companies";

    console.log(current_state);

    $.ajax({
      url:'https://apidev.legionanalytics.com/api/people/?format=json&page_size=30',
      dataType:'json',
      cache:false,
      success:function(results){
        this.setState({
          results:results,
          resultsArray: this.state.resultsArray.concat(results.results),
          loading: false
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  handleSearch(query, apiState) {
    this.setState({loading:true, resultsArray: []});
    query = query.text;
    let current_state;

    if (apiState !== undefined) {
      current_state = apiState
    } else {
      current_state = this.state.apiState.people ? "people" : "companies";
    }

    let url = `https://apidev.legionanalytics.com/api/${current_state}/?format=json&page_size=50&${query}`;

    $.ajax({
      url:`https://apidev.legionanalytics.com/api/${current_state}/?format=json&page_size=50&${query}`,
      dataType:'json',
      cache:false,
      success:function(results){
        console.log(results);
        this.setState({
          results: results,
          resultsArray: this.state.resultsArray.concat(results.results),
          loading: false
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  nextSearch(query) {

    $.ajax({
      url:query,
      dataType:'json',
      cache:false,
      success:function(results){
        console.log(results);
        this.setState({
          results: results,
          resultsArray: this.state.resultsArray.concat(results.results)
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  render() {
    console.log(this.state.apiState);
    return (
      <div class="page-container gray-light-background">
        <div class="sixteen columns">
          <SearchMenu interestSuggestions={this.state.interestSuggestions} apiState={this.state.apiState} setApiState={this.setApiState} onSearchChange={this.handleSearch} onInterestSearch={this.handleInterestSearch}/>
          <ActionBar results={this.state.results}/>
          { this.state.loading ?
            <div class="eleven columns"><div id="loaderContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding"><CubeGrid size={50} color="#36b7ea" /></div></div> :
            <ResultsTable results={this.state.results} resultsArray={this.state.resultsArray} apiState={this.state.apiState} nextSearch={this.nextSearch} rowState={this.state.rowState} checkedAll={this.state.checkedAll} checkAll={this.checkAll} checkRow={this.checkRow}/>
          }
        </div>
      </div>
    )
  }
}
