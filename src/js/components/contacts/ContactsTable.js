import React from "react"
import { Dropdown, NavItem, Input } from "react-materialize";
import { AgGrid } from 'ag-grid/main';
import { AgGridReact } from 'ag-grid-react';

// import ContactResults from "./ContactResults"
import CheckMarkRenderer from "../search/CheckMarkRenderer"

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

  onCellClicked(event) {
      console.log('onCellClicked: ' + event.data.name + ', col ' + event.colIndex);
  }

  onRowSelected(event) {
      console.log('onRowSelected: ' + event.node.data.name);
  }

  render() {
    let data = this.props.results;
    console.log(this.props);
    let mappedResults;
    const tableHeader = [
      {headerName:"", field:"chck", width: 30, checkboxSelection:true, enableColResize:false },
      {headerName:"Name", field:"name", width: 130, enableRowGroup: true, enableColResize:true },
      {headerName:"Job Title", field:"jobTitle", width: 130, enableRowGroup: true},
      {headerName:"Company", field:"companyName", width: 130, enableRowGroup: true},
      {headerName:"location", field:"location", width: 130, enableRowGroup: true},
      {headerName:"Industry", field:"industry", width: 130, enableRowGroup: true},
      {headerName:"Technology", field:"technologies", width: 130, enableRowGroup: true},
      {headerName:"Company Size", field:"companySize", width: 130, enableRowGroup: true},
      {headerName:"Revenue", field:"revenue", width: 130, enableRowGroup: true},
      {headerName:"Funding", field:"funding", width: 130, enableRowGroup: true},
      {headerName:"Email", field:"email", width: 130, enableRowGroup: true},
      {headerName:"Phone", field:"phone", width: 130, enableRowGroup: true},
      {headerName:"Website", field:"homePage", width: 130, enableRowGroup: true},
      {headerName:"Angellist", field:"angellist", width: 130, enableRowGroup: true},
      {headerName:"Linkedin", field:"linkedin", width: 130, enableRowGroup: true},
      {headerName:"Facebook", field:"facebook", width: 130, enableRowGroup: true},
      {headerName:"Twitter", field:"twitter", width: 130, enableRowGroup: true},
      {headerName:"Instragram", field:"instagram", width: 130, enableRowGroup: true},
      {headerName:"Crunchbase", field:"crunchbase", width: 130, enableRowGroup: true},
      {headerName:"Age", field:"age", width: 130, enableRowGroup: true},
      {headerName:"Education", field:"education", width: 130, enableRowGroup: true},
      {headerName:"Interests", field:"interests", width: 130, enableRowGroup: true}
    ];

    let dataSource = {
      rowCount: null, // behave as infinite scroll
      getRows: function (params) {
        if ((data.results !== undefined) && (data.results.length > 0)) {
          this.props.nextSearch(data.next);
        }
      }
    };

    if ((data.results !== undefined) && (data.results.length > 0)) {
      mappedResults = data.results.map((result, index) => {
        return (
          {
            name: result.person_name,
            jobTitle: result.title,
            education: this.arrayConvert(result.education),
            age: result.age,
            interests: this.arrayConvert(result.interests),
            phone: result.has_phone,
            email: result.has_email ,
            linkedin: result.has_linkedin,
            angellist: result.has_angellist,
            facebook: result.has_facebook,
            instagram: result.has_instagram,
            twitter: result.has_twitter,
            crunchbase: result.has_crunchbase,
            homePage: result.has_home_page,
            wikipedia: result.has_wikipedia,
            companyName: result.company_name,
            location: result.location,
            industry: this.arrayConvert(result.industries),
            revenue: (result.revenue).toLocaleString(),
            funding: (result.funding).toLocaleString(),
            technologies: this.arrayConvert(result.technologies),
            companySize: (result.company_size).toLocaleString()
          }
        );

        // return (
        //   <Results index={index} key={result.id} name={result.person.name} age={result.person.age} jobTitle={result.title} companyName={result.company.name} checked={this.props.rowState[index]} callback={this.props.checkRow} />
        // );
      })
    } else if (data.results !== undefined) {
      return (
        <div class="sixteen columns">
          <div id="noResultsContainer" class="white-background">
            <img id="noResultsImg" src="src/img/no_search_results.png" />
            <span id="noResultsMessage" class="electric-blue">No Search Results</span>
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
            onCellClicked={this.onCellClicked.bind(this)}
            showToolPanel={this.state.showToolPanel}

            icons={this.state.icons}

            columnDefs={tableHeader}
            rowData={mappedResults}
            datasource={dataSource}

            rowModelType="virtual"
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
