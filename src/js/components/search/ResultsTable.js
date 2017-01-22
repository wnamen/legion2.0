import React, { PropTypes, Component, Children } from 'react';
import { Dropdown, NavItem, Input } from "react-materialize";
import { AgGrid } from 'ag-grid/main';
import { AgGridReact } from 'ag-grid-react';

import CheckMarkRenderer from "./CheckMarkRenderer";
import CheckBoxRenderer from "./CheckBoxRenderer";
import SizeFilterRenderer from "./SizeFilterRenderer";
import RevenueFundingFilterRenderer from "./RevenueFundingFilterRenderer";


export default class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {
        sortAscending: "<i class='fa fa-long-arrow-down'/>",
        sortDescending: "<i class='fa fa-long-arrow-up'/>",
        groupExpanded: "<i class='fa fa-minus-square-o'/>",
        groupContracted: "<i class='fa fa-plus-square-o'/>",
        columnGroupOpened: "<i class='fa fa-minus-square-o'/>",
        columnGroupClosed: "<i class='fa fa-plus-square-o'/>"
      },
      checked: []
    };
    this.arrayConvert = this.arrayConvert.bind(this);
    this.handleNextSearch = this.handleNextSearch.bind(this);
  }

  // FLATTENS GIVEN ARRAY AND RETURNS A STRING
  arrayConvert(arr) {
    let endIdx = arr.length - 1;
    let convertedString = "";
    arr.forEach((item, idx) => {
      idx === endIdx ? convertedString = convertedString + item : convertedString = convertedString + item + ", " ;
    });
    return convertedString;
  }

  // HANDLES THE LOAD MORE BUTTON BY CAPTURING THE NEXT ENDPOINT AND PASSING IT TO AJAX
  handleNextSearch(){
    const next = this.props.results.next;
    this.props.nextSearch(next);
    this.forceUpdate();
  }

  // REQUIRED APIS TO RUN AG-GRID
  onGridReady(params) {
      this.api = params.api;
      this.columnApi = params.columnApi;
  }

  render() {
    let data = this.props.resultsArray;
    let mappedResults;
    let currentHeader;

    // TABLE HEADER FOR PEOPLE API
    const peopleHeader = [
      {headerName:"", field:"id", width: 30, cellRendererFramework: CheckBoxRenderer },
      {headerName:"Name", field:"name", width: 130 },
      {headerName:"Job Title", field:"jobTitle", width: 130},
      {headerName:"Company", field:"companyName", width: 130},
      {headerName:"location", field:"location", width: 130},
      {headerName:"Industry", field:"industry", width: 130},
      {headerName:"Technology", field:"technologies", width: 130},
      {headerName:"Company Size", field:"companySize", width: 130, cellRendererFramework: SizeFilterRenderer},
      {headerName:"Revenue", field:"revenue", width: 130, cellRendererFramework: RevenueFundingFilterRenderer},
      {headerName:"Funding", field:"funding", width: 130, cellRendererFramework: RevenueFundingFilterRenderer},
      {headerName:"Email", field:"email", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Phone", field:"phone", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Website", field:"homePage", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Angellist", field:"angellist", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Linkedin", field:"linkedin", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Facebook", field:"facebook", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Twitter", field:"twitter", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Instragram", field:"instagram", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Crunchbase", field:"crunchbase", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Age", field:"age", width: 130},
      {headerName:"Education", field:"education", width: 130},
      {headerName:"Interests", field:"interests", width: 130}
    ];

    // TABLE HEADER FOR COMPANY API
    const companyHeader = [
      {headerName:"", field:"id", width: 30, cellRendererFramework: CheckBoxRenderer },
      {headerName:"Company", field:"companyName", width: 130},
      {headerName:"location", field:"location", width: 130},
      {headerName:"Industry", field:"industry", width: 130},
      {headerName:"Technology", field:"technologies", width: 130},
      {headerName:"Company Size", field:"companySize", width: 130, cellRendererFramework: SizeFilterRenderer},
      {headerName:"Revenue", field:"revenue", width: 130, cellRendererFramework: RevenueFundingFilterRenderer},
      {headerName:"Funding", field:"funding", width: 130, cellRendererFramework: RevenueFundingFilterRenderer},
      {headerName:"Company Phone", field:"companyPhone", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Website", field:"companyHomePage", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Linkedin", field:"companyLinkedin", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Angellist", field:"companyAngellist", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Crunchbase", field:"companyCrunchbase", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Twitter", field:"companyTwitter", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Instagram", field:"companyInstagram", width: 130, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Wikipedia", field:"companyWikipedia", width: 130, cellRendererFramework: CheckMarkRenderer}
    ];

    // DETERMINES THE CURRENT API STATE AND SETS THE RESPECTIVE HEADER
    if (this.props.apiState.job === true) {
      currentHeader = peopleHeader;
    } else {
      currentHeader = companyHeader;
    }

    // CHECKS IF DATA IS PRESENT TO DISPLAY IN GRID AND MAPS EACH RESULT TO THE COLUMNS OF THE RESPECTIVE API STATE
    if ((data !== undefined) && (data.length > 0)) {
      mappedResults = data.map((result, index) => {
        if (this.props.apiState.job === true) {
          return (
            {
              id: result.job_id,
              name: result.person_name,
              jobTitle: result.title,
              education: this.arrayConvert(result.education),
              age: result.age,
              interests: this.arrayConvert(result.interests),
              phone: result.has_phone ? true : false,
              email: result.has_email  ? true : false,
              linkedin: result.has_linkedin ? true : false,
              angellist: result.has_angellist ? true : false,
              facebook: result.has_facebook ? true : false,
              instagram: result.has_instagram ? true : false,
              twitter: result.has_twitter ? true : false,
              crunchbase: result.has_crunchbase ? true : false,
              homePage: result.has_home_page ? true : false,
              wikipedia: result.has_wikipedia ? true : false,
              companyName: result.company_name,
              location: result.location,
              industry: this.arrayConvert(result.industries),
              revenue: (result.revenue).toLocaleString(),
              funding: (result.funding).toLocaleString(),
              technologies: this.arrayConvert(result.technologies),
              companySize: (result.company_size).toLocaleString()
            }
          );
        } else {
          return (
            {
              companyName: result.company_name,
              location: result.location,
              industry: this.arrayConvert(result.industries),
              revenue: (result.revenue).toLocaleString(),
              funding: (result.funding).toLocaleString(),
              technologies: this.arrayConvert(result.technologies),
              companySize: (result.company_size).toLocaleString(),
              companyPhone: result.has_phone ? true : false,
              companyLinkedin: result.has_linkedin ? true : false,
              companyAngellist: result.has_angellist ? true : false,
              companyCrunchbase: result.has_crunchbase ? true : false,
              companyTwitter: result.has_twitter ? true : false,
              companyInstagram: result.has_instagram ? true : false,
              companyHomePage: result.has_home_page ? true : false,
              companyWikipedia: result.has_wikipedia ? true : false
            }
          )
        }
      })
    } else if (data !== undefined) {
      // RETURNS AN IMAGE PLACEHOLDER IF NO DATA IS PRESENT TO DISPLAY
      return (
        <div class="eleven columns">
          <div id="noResultsContainer" class="white-background">
            <img id="noResultsImg" src="src/img/no_search_results.png" />
            <span id="noResultsMessage" class="electric-blue">No Search Results</span>
          </div>
        </div>
      )
    }

    return(
      <div class="eleven columns">
        <div id="resultTable" class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <AgGridReact
            onGridReady={this.onGridReady.bind(this)}
            icons={this.state.icons}

            columnDefs={currentHeader}
            rowData={mappedResults}

            suppressDragLeaveHidesColumns="true"
            suppressCellSelection="true"
            suppressRowClickSelection="true"
            enableColResize="true"
            enableSorting="true"
            rowHeight="35"
            rowWidth="130"
          />
      </div>
      <div id="load-more-bar" class="navbar white-background small-border gray-border large-top-margin small-horizontal-padding">
        <a class="lgnBtn smoothBkgd white electric-blue-background electric-blue-border" onClick={this.handleNextSearch}>Load More Results</a>
      </div>
    </div>
    );
  }
}
