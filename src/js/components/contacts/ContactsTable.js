import React, { PropTypes, Component, Children } from 'react';
import { IndexLink } from "react-router";
import { Dropdown, NavItem, Input } from "react-materialize";
import { AgGrid } from 'ag-grid/main';
import { AgGridReact } from 'ag-grid-react';

import CheckBoxRenderer from "./CheckBoxRenderer";
import EmailLinkRenderer from "./EmailLinkRenderer";
import ContactLinkRenderer from "./ContactLinkRenderer";
import PersonLinkRenderer from "./PersonLinkRenderer";
import CompanyLinkRenderer from "./CompanyLinkRenderer";

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

  // FLATTENS GIVEN ARRAY AND RETURNS A STRING
  arrayConvert(arr) {
    if (arr === undefined) {
      return
    }
    let endIdx = arr.length - 1;
    let convertedString = "";
    arr.forEach((item, idx) => {
      idx === endIdx ? convertedString = convertedString + item : convertedString = convertedString + item + ", " ;
    });
    return convertedString;
  }

  // REQUIRED APIS TO RUN AG-GRID
  onGridReady(params) {
      this.api = params.api;
      this.columnApi = params.columnApi;
  }


  render() {
    let data = this.props.results;
    let mappedResults;

    // TABLE HEADER FOR AG-GRID COLUMNS
    const tableHeader = [
      {headerName:"", field:"id", width: 30, cellRendererFramework: CheckBoxRenderer },
      {headerName:"Name", field:"name", width: 130, cellRendererFramework: PersonLinkRenderer },
      {headerName:"Job Title", field:"jobTitle", width: 130 },
      {headerName:"Company", field:"companyName", width: 130, cellRendererFramework: CompanyLinkRenderer },
      {headerName:"Age", field:"age", width: 130 },
      {headerName:"Location", field:"location", width: 130 },
      {headerName:"Education", field:"education", width: 130 },
      {headerName:"Interests", field:"interests", width: 130 },
      {headerName:"Phone", field:"phone", width: 130 },
      {headerName:"Email", field:"email", width: 130, cellRendererFramework: EmailLinkRenderer },
      {headerName:"Linkedin", field:"linkedin", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Facebook", field:"facebook", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Twitter", field:"twitter", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Crunchbase", field:"crunchbase", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Angellist", field:"angellist", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Wikipedia", field:"wikipedia", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Home Page", field:"homePage", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Industry", field:"industry", width: 130 },
      {headerName:"Techonology", field:"technologies", width: 130 },
      {headerName:"Revenue", field:"revenue", width: 130 },
      {headerName:"Funding", field:"funding", width: 130 },
      {headerName:"Company Location", field:"companyLocation", width: 130 },
      {headerName:"Company Size", field:"companySize", width: 130 },
      {headerName:"Company Linkedin", field:"companyLinkedin", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Company Twitter", field:"companyTwitter", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Company Facebook", field:"companyFacebook", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Company Wikipedia", field:"companyWikipedia", width: 130, cellRendererFramework: ContactLinkRenderer },
      {headerName:"Company Home Page", field:"companyHomePage", width: 130, cellRendererFramework: ContactLinkRenderer }
    ];

    // CHECKS IF DATA IS PRESENT TO DISPLAY IN GRID AND MAPS EACH RESULT TO THE COLUMNS
    if ((data.results !== undefined) && (data.results.length > 0)) {
      mappedResults = data.results.map((result, index) => {
        return (
          {
            id: result.id,
            company_id: result.company.id,
            name: result.person.name ? result.person.name : "",
            jobTitle: result.job.title ? result.job.title : "",
            companyName: result.company.name ? result.company.name : "",
            education: result.person.education ? this.arrayConvert(result.education) : "",
            age: result.person.age ? result.person.age : "",
            location: result.person.location ? result.person.location : "",
            interests: result.person.interests ? this.arrayConvert(result.person.interests) : "",
            phone: result.job.phone ? result.job.phone : "",
            email: result.job.email ? result.job.email : "",
            linkedin: result.person.personal_linkedin ? (`https://www.linkedin.com/${result.person.personal_linkedin}`).toLowerCase() : "",
            facebook: result.person.personal_facebook ? (`https://www.facebook.com/${result.person.personal_facebook}`).toLowerCase() : "",
            twitter: result.person.personal_twitter ? (`https://www.twitter.com/${result.person.personal_twitter}`).toLowerCase() : "",
            crunchbase: result.person.personal_crunchbase ? (`https://www.crunchbase.com/${result.person.personal_crunchbase}`).toLowerCase() : "",
            angellist: result.person.personal_angellist ? (`https://www.angellist.com/${result.person.personal_angellist}`).toLowerCase() : "",
            wikipedia: result.person.personal_wikipedia ? (`https://www.wikipedia.com/${result.person.personal_wikipedia}`).toLowerCase() : "",
            homePage: result.person.personal_homePage ? (result.person.personal_homePage).toLowerCase() : "",
            industry: result.company.industries ? this.arrayConvert(result.company.industries) : "",
            technologies: result.company.technologies ? this.arrayConvert(result.company.technologies) : "",
            companyLocation: result.company.location ? result.company.location : "",
            revenue: (result.company.revenue).toLocaleString() ? (result.company.revenue).toLocaleString() : "",
            funding: (result.company.funding).toLocaleString() ? (result.company.funding).toLocaleString() : "",
            companySize: (result.company.number_of_employees).toLocaleString() ? (result.company.number_of_employees).toLocaleString() : "",
            companyLinkedin: result.company.company_linkedin ? (`https://www.linkedin.com/${result.company.company_linkedin}`).toLowerCase() : "",
            companyTwitter: result.company.company_twitter ? (`https://www.twitter.com/${result.company.company_twitter}`).toLowerCase() : "",
            companyFacebook: result.company.company_facebook ? (`https://www.facebook.com/${result.company.company_facebook}`).toLowerCase() : "",
            companyWikipedia: result.company.company_wikipedia ? (`https://www.wikipedia.com/${result.company.company_wikipedia}`).toLowerCase() : "",
            companyHomePage: result.company.company_home_page ? (result.company.company_home_page).toLowerCase() : ""
          }
        );
      })
    } else if ((data.results === undefined) || (data.results.length === 0)){
      // RETURNS AN IMAGE PLACEHOLDER IF NO DATA IS PRESENT TO DISPLAY
      return (
        <div class="sixteen columns">
          <div id="noResultsContainer" class="white-background small-border gray-border large-top-margin small-horizontal-padding">
            <img id="noResultsImg" src="src/img/no_search_results.png" />
            <span id="noResultsMessage" class="electric-blue">This List is Empty</span>
          </div>
        </div>
      )
    }

    return(
      <div class="sixteen columns">
        <div id="resultTable" class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <AgGridReact
            onGridReady={this.onGridReady.bind(this)}
            icons={this.state.icons}

            columnDefs={tableHeader}
            rowData={mappedResults}

            captureSelected={this.props.captureSelected}

            suppressDragLeaveHidesColumns="true"
            suppressCellSelection="true"
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
