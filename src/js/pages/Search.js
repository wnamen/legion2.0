import React, { Component }   from "react";
import cookie                 from "react-cookie";
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
      token: cookie.load("token"),
      loading: false,
      apiState: {
        job: true,
        company: false
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
        job: !this.state.apiState.job,
        company: !this.state.apiState.company
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
    let current_state = this.state.apiState.job ? "job" : "company";
    let tokenHeader = `Token ${this.state.token}`;
    console.log(tokenHeader);

    console.log(current_state);

    $.ajax({
      url:'https://legionv2-api.us-west-2.elasticbeanstalk.com/search/job/?page_size=50',
      headers: {"Authorization": tokenHeader },
      dataType:'json',
      crossDomain: true,
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
      current_state = this.state.apiState.job ? "job" : "company";
    }

    let url = `https://legionv2-api.us-west-2.elasticbeanstalk.com/search/${current_state}/?format=json&page_size=50&${query}`;
    let tokenHeader = `Token ${this.state.token}`;
    console.log(url);

    $.ajax({
      url: url,
      headers: {"Authorization": tokenHeader},
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
          <SearchMenu interestSuggestions={this.state.interestSuggestions} apiState={this.state.apiState} setApiState={this.setApiState} onSearchChange={this.handleSearch} onInterestSearch={this.handleInterestSearch} userToken={this.state.token}/>
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
