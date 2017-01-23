import React, { PropTypes, Component, Children } from 'react';
import cookie                 from "react-cookie";
import { Link }               from "react-router";
import isEqual from 'lodash.isequal';
import { CubeGrid }           from "better-react-spinkit"
import $                      from "jquery"

import ActionBar              from "../components/search/ActionBar"
import SearchMenu             from "../components/search/SearchMenu"
import ResultsTable           from "../components/search/ResultsTable"

export default class Search extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      token: cookie.load("token"),
      loading: false,
      apiState: {
        job: true,
        company: false
      },
      results: [],
      resultsArray: [],
      pureResult: [],
      checkedAll: false,
      rowState: []
    };
    
    this.setFilterAccess = this.setFilterAccess.bind(this);
    this.setApiState = this.setApiState.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.nextSearch = this.nextSearch.bind(this);
    this.filterBy = this.filterBy.bind(this);
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
    const checked = [];

    return {
      captureSelected: (id) => {
        checked.push(id)
      },

      purchaseSelected: (id) => {
        let params = this.state.apiState.job === true ? {tm_id: id, jobs: checked} : {tm_id: id, companies: checked};
        http.post('/add-contacts-to-tm', params).then(response => console.log(response))
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
      success: (results) => {
        this.setState({
          results:results,
          resultsArray: this.state.resultsArray.concat(results.results),
          pureResult: this.state.resultsArray.concat(results.results),
          loading: false
        })
      }
    });
  }

  setFilterAccess = (filterStatus) => {
    filterStatus === "basic" ? this.setState({searchFilters: true}) : this.setState({searchFilters: false});
  };

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
          pureResult: this.state.resultsArray.concat(results.results),
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
          resultsArray: this.state.resultsArray.concat(results.results),
          pureResult: this.state.pureResult.concat(results.results)
        });
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }
  
  filterBy(data, type){
    const { resultsArray, pureResult } = this.state;
    

      let bySize = data.filter(v => v.name === 'company_size').length ?
        
        data.filter(v => v.name === 'company_size').reduce((previousValue, currentValue) => {
        
            return pureResult.filter(c =>
              c[currentValue.name] > Number(currentValue.value.split('-')[0]) && c[currentValue.name] < Number(currentValue.value.split('-')[1])
            ).concat(previousValue)
          
      }, []) : null;
      
      let byRevenue = data.filter(v => v.name === 'revenue').length ?
        
        data.filter(v => v.name === 'revenue').reduce((previousValue, currentValue) => {
            let filtered = bySize ? bySize : pureResult;
            let ready = filtered.filter(c =>
              c[currentValue.name] > Number(currentValue.value.split('-')[0]) && c[currentValue.name] < Number(currentValue.value.split('-')[1])
            ).concat(previousValue);
            
            bySize = null;
            return ready;
          
      }, []) : null;
    
      let byFunding = data.filter(v => v.name === 'funding').length ?
        
        data.filter(v => v.name === 'funding').reduce((previousValue, currentValue) => {
            let filtered = !byRevenue ? bySize ? bySize : pureResult : pureResult ;

            let ready = filtered.filter(c =>
              c[currentValue.name] > Number(currentValue.value.split('-')[0]) && c[currentValue.name] < Number(currentValue.value.split('-')[1])
            ).concat(previousValue);

            bySize = null;
            byRevenue = null;
            return ready;
          
      }, []) : null;
  
    const filteredCheck = [bySize, byRevenue, byFunding].filter(v => v)[0];
    let filtered = !data.length ? pureResult : filteredCheck;
    
    this.setState({
      resultsArray: filtered
    })
    
    this.forceUpdate();
  };

  render() {
    
    const { searchFilters, interestSuggestions, apiState, token, results, loading, resultsArray} = this.state;
    
    return (
      <div class="page-container gray-light-background">
        <div class="sixteen columns">
          <SearchMenu
            searchFilters={searchFilters}
            interestSuggestions={interestSuggestions}
            apiState={apiState}
            userToken={token}
            setApiState={this.setApiState}
            filterBy={this.filterBy}
            onSearchChange={this.handleSearch}
            onInterestSearch={this.handleInterestSearch}
          />
          <ActionBar results={results}/>
          { loading ?
            <div class="eleven columns">
              <div id="loaderContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding">
                <CubeGrid size={50} color="#36b7ea" />
              </div>
            </div> :
            <ResultsTable
              results={results}
              resultsArray={resultsArray}
              apiState={apiState}
              nextSearch={this.nextSearch}
            />
          }
        </div>
      </div>
    )
  }
}


Search.contextTypes = {
  http: PropTypes.func.isRequired
};


// doFilter = (data) => {
//   const { resultsArray, results } = this.state;
//
//   let filtered = data.reduce((previousValue, currentValue) => {
//     return resultsArray.filter(c =>
//       c[currentValue.name] > Number(currentValue.value.split('-')[0]) && c[currentValue.name] < Number(currentValue.value.split('-')[1])
//     ).concat(previousValue)
//   }, []);
//
//   this.setState({
//     resultsArray: filtered
//   })
//
// }
//
// filterBySize(data, type) {
//
//   const { results, resultsArray } = this.state;
//
//   console.log(results.results);
//   console.log(resultsArray);
//
//   let bySize = data.filter(v => v.name === 'size');
//   let byRevenue = data.filter(v => v.name === 'revenue');
//   let byFunding = data.filter(v => v.name === 'funding');
//
//   let filtered1 = bySize.length ?    this.doFilter(bySize)    : '' ;
//   let filtered2 = byRevenue.length ? this.doFilter(byRevenue) : results.results;
//   let filtered3 = byFunding.length ? this.doFilter(byRevenue) : results.results;
// };
//
// filterByRevenue(data){
//
//   const { resultsArray, result} = this.state;
//
//   let filtered = data.length ?
//
//     data.filter(v => v.name === 'company_size').reduce((previousValue, currentValue) => {
//
//       return resultsArray.filter(c =>
//         c[currentValue.name] > Number(currentValue.value.split('-')[0]) && c[currentValue.name] < Number(currentValue.value.split('-')[1])
//       ).concat(previousValue)
//
//     }, resultsArray)
//
//     : resultsArray;
//
//   this.setState({
//     resultsArray: filtered
//   })
// };
//
// filterByFunding(data){
//
//   const { resultsArray, result} = this.state;
//
//   let filtered = data.length ?
//
//     data.filter(v => v.name === 'funding').reduce((previousValue, currentValue) => {
//
//       return resultsArray.filter(c =>
//         c[currentValue.name] > Number(currentValue.value.split('-')[0]) && c[currentValue.name] < Number(currentValue.value.split('-')[1])
//       ).concat(previousValue)
//
//     }, resultsArray)
//
//     : resultsArray;
//
//   this.setState({
//     resultsArray: filtered
//   })
// };