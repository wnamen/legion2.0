import React from "react"
import { Dropdown, NavItem, Input } from "react-materialize";
import { AgGrid } from 'ag-grid/main';
import { AgGridReact } from 'ag-grid-react';

import CheckMarkRenderer from "../search/CheckMarkRenderer";
import CheckBoxRenderer from "../search/CheckBoxRenderer";

export default class ContactsTable extends React.Component {
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
      }
    };
    this.arrayConvert = this.arrayConvert.bind(this);
  }

  arrayConvert(arr) {
    let endIdx = arr.length - 1;
    let convertedString = "";
    arr.forEach((item, idx) => {
      idx === endIdx ? convertedString = convertedString + item : convertedString = convertedString + item + ", " ;
    });
    return convertedString;
  }

  onGridReady(params) {
      this.api = params.api;
      this.columnApi = params.columnApi;
  }

  getRows() {
  }

  selectAll() {
      this.api.selectAll();
  }

  deselectAll() {
      this.api.deselectAll();
  }

  onRowSelected(e) {
      console.log('onRowSelected: ' + e.node.data.name);
      this.props.captureSelected(e.node.data);
  }

  render() {
    let data = this.props.results;

    let mappedResults;
    const tableHeader = [
      {headerName:"", field:"chck", width: 30, cellRendererFramework: CheckBoxRenderer },
      {headerName:"Name", field:"name", width: 130 },
      {headerName:"Job Title", field:"jobTitle", width: 130 },
      {headerName:"Company", field:"companyName", width: 130 },
      {headerName:"Age", field:"age", width: 130 },
      {headerName:"Location", field:"location", width: 130 },
      // {headerName:"Education", field:"education", width: 130 },
      {headerName:"Interests", field:"interests", width: 130 },
      // {headerName:"Phone", field:"phone", width: 130 },
      // {headerName:"Email", field:"email", width: 130 },
      {headerName:"Linkedin", field:"linkedin", width: 130 },
      {headerName:"Facebook", field:"facebook", width: 130 },
      {headerName:"Twitter", field:"twitter", width: 130 },
      {headerName:"Crunchbase", field:"crunchbase", width: 130 },
      {headerName:"Angellist", field:"angellist", width: 130 },
      {headerName:"Wikipedia", field:"wikipedia", width: 130 },
      {headerName:"Home Page", field:"homePage", width: 130 },
      {headerName:"Industry", field:"industry", width: 130 },
      {headerName:"Techonology", field:"technologies", width: 130 },
      {headerName:"Revenue", field:"revenue", width: 130 },
      {headerName:"Funding", field:"funding", width: 130 },
      {headerName:"Company Location", field:"companyLocation", width: 130 },
      {headerName:"Company Size", field:"companySize", width: 130 },
      {headerName:"Company Linkedin", field:"companyLinkedin", width: 130 },
      {headerName:"Company Twitter", field:"companyTwitter", width: 130 },
      {headerName:"Company Facebook", field:"companyFacebook", width: 130 },
      {headerName:"Company Wikipedia", field:"companyWikipedia", width: 130 },
      {headerName:"Company Home Page", field:"companyHomePage", width: 130 }
    ];

    if ((data.results !== undefined) && (data.results.length > 0)) {
      mappedResults = data.results.map((result, index) => {
        return (
          {
            name: result.person.name ? result.person.name : "",
            jobTitle: result.job.title ? result.job.title : "",
            companyName: result.company.name ? result.company.name : "",
            age: result.person.age ? result.person.age : "",
            location: result.person.location ? result.person.location : "",
            interests: result.person.interests ? this.arrayConvert(result.person.interests) : "",
            linkedin: result.person.personal_linkedin ? result.person.personal_linkedin : "",
            facebook: result.person.personal_facebook ? result.person.personal_facebook : "",
            twitter: result.person.personal_twitter ? result.person.personal_twitter : "",
            crunchbase: result.person.personal_crunchbase ? result.person.personal_crunchbase : "",
            angellist: result.person.personal_angellist ? result.person.personal_angellist : "",
            wikipedia: result.person.personal_wikipedia ? result.person.personal_wikipedia : "",
            homePage: result.person.personal_homePage ? result.person.personal_homePage : "",
            industry: result.company.industries ? this.arrayConvert(result.company.industries) : "",
            technologies: result.company.technologies ? this.arrayConvert(result.company.technologies) : "",
            companyLocation: result.company.location ? result.company.location : "",
            revenue: (result.company.revenue).toLocaleString() ? (result.company.revenue).toLocaleString() : "",
            funding: (result.company.funding).toLocaleString() ? (result.company.funding).toLocaleString() : "",
            companySize: (result.company.number_of_employees).toLocaleString() ? (result.company.number_of_employees).toLocaleString() : "",
            companyLinkedin: result.company.company_linkedin ? result.company.company_linkedin : "",
            companyTwitter: result.company.company_twitter ? result.company.company_twitter : "",
            companyFacebook: result.company.company_facebook ? result.company.company_facebook : "",
            companyWikipedia: result.company.company_wikipedia ? result.company.company_wikipedia : "",
            companyHomePage: result.company.company_home_page ? result.company.company_home_page : ""
          }
        );
      })
    } else if ((data.results === undefined) || (data.results.length === 0)){
      return (
        <div class="sixteen columns">
          <div id="noResultsContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding">
            <img id="noResultsImg" src="src/img/no_search_results.png" />
            <span id="noResultsMessage" class="electric-blue">This List is Empty</span>
          </div>
        </div>
      )
    }

    console.log(mappedResults);

    return(
      <div class="sixteen columns">
        <div id="resultTable" class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <AgGridReact
            onGridReady={this.onGridReady.bind(this)}
            onRowSelected={this.onRowSelected.bind(this)}
            showToolPanel={this.state.showToolPanel}

            icons={this.state.icons}

            columnDefs={tableHeader}
            rowData={mappedResults}

            suppressDragLeaveHidesColumns="true"
            suppressCellSelection="true"
            rowSelection="multiple"
            enableColResize="true"
            enableSorting="true"
            rowHeight="35"
            rowWidth="130"
          />
      </div>
    </div>
    );
  }
}
