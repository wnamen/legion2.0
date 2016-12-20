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
      results: [],
      checkedAll: false,
      rowState: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.checkRow = this.checkRow.bind(this);
  }

  setRowState(results) {
    let rowState =[];

    if (results !== undefined) {
      results.results.forEach(function(results, index) {
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

    this.state.rowState.forEach(function(results, index) {
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
        console.log(results);
        this.setRowState(results);
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
            <ActionBar results={this.state.results}/>
            <ResultsTable results={this.state.results} rowState={this.state.rowState} checkedAll={this.state.checkedAll} checkAll={this.checkAll} checkRow={this.checkRow}/>
          </div>
        </div>
      </div>
    )
  }
}
