import React, { PropTypes, Component, Children } from 'react';
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
    this.setFilterAccess = this.setFilterAccess.bind(this);
    this.setApiState = this.setApiState.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.nextSearch = this.nextSearch.bind(this);
  }

  setApiState() {
    this.setState({
      apiState: {
        job: !this.state.apiState.job,
        company: !this.state.apiState.company
      }
    })
  }

  static childContextTypes = {
    captureSelected: PropTypes.func,
    purchaseSelected: PropTypes.func,
  };

  getChildContext() {
    const { http } = this.context;
    const checked = []

    return {
      captureSelected: (id) => {
        checked.push(id)
      },

      purchaseSelected: (id) => {
        let params;
        this.state.apiState.job === true ? params = {tm_id: id, jobs: checked} : params = {tm_id: id, companies: checked};
        http.post('/add-contacts-to-tm', params: params)
          .then(response => console.log(response))
      }
    }
  }

  componentWillMount(){
    this.setState({loading:true});
    let current_state = this.state.apiState.job ? "job" : "company";
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: "https://api.legionanalytics.com/me",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        this.setFilterAccess(response.settings.plan.search_filters);
      },
      error: (response) => {
        console.log(response);
      }
    });

    $.get({
      url:'https://api.legionanalytics.com/search/job/?page_size=50',
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

  setFilterAccess = (filterStatus) => {
    filterStatus === "basic" ? this.setState({searchFilters: true}) : this.setState({searchFilters: false});
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

    let url = `https://api.legionanalytics.com/search/${current_state}/?format=json&page_size=50&${query}`;
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url: url,
      headers: {"Authorization": tokenHeader},
      dataType:'json',
      cache:false,
      success:function(results){
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

  nextSearch(url) {
    let tokenHeader = `Token ${this.state.token}`;

    $.get({
      url:url,
      headers: {"Authorization": tokenHeader},
      dataType:'json',
      cache:false,
      success:function(results){
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
    return (
      <div class="page-container gray-light-background">
        <div class="sixteen columns">
          <SearchMenu searchFilters={this.state.searchFilters} interestSuggestions={this.state.interestSuggestions} apiState={this.state.apiState} setApiState={this.setApiState} onSearchChange={this.handleSearch} onInterestSearch={this.handleInterestSearch} userToken={this.state.token}/>
          <ActionBar results={this.state.results}/>
          { this.state.loading ?
            <div class="eleven columns">
              <div id="loaderContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding">
                <CubeGrid size={50} color="#36b7ea" />
              </div>
            </div> :
            <ResultsTable results={this.state.results} resultsArray={this.state.resultsArray} apiState={this.state.apiState} nextSearch={this.nextSearch}/>
          }
        </div>
      </div>
    )
  }
}


Search.contextTypes = {
  http: PropTypes.func.isRequired
};
