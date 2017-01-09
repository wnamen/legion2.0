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
      idx === endIdx ? convertedString = convertedString + item.name : convertedString = convertedString + item.name + ", " ;
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
      {headerName:"Age", field:"age", width: 130, enableRowGroup: true},
      {headerName:"Education", field:"education", width: 130, enableRowGroup: true},
      {headerName:"Interests", field:"interests", width: 130, enableRowGroup: true},
      {headerName:"Phone", field:"phone", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Email", field:"email", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Linkedin", field:"linkedin", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Facebook", field:"facebook", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Twitter", field:"twitter", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Crunchbase", field:"crunchbase", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Home Page", field:"homePage", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company", field:"companyName", width: 130, enableRowGroup: true},
      {headerName:"Industry", field:"industry", width: 130, enableRowGroup: true},
      {headerName:"Revenue", field:"revenue", width: 130, enableRowGroup: true},
      {headerName:"Funding", field:"funding", width: 130, enableRowGroup: true},
      {headerName:"Company Size", field:"companySize", width: 130, enableRowGroup: true},
      {headerName:"Company Phone", field:"companyPhone", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Linkedin", field:"companyLinkedin", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Twitter", field:"companyTwitter", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer},
      {headerName:"Company Home Page", field:"companyHomePage", width: 130, enableRowGroup: true, cellRendererFramework: CheckMarkRenderer}
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
            name: result.person.name,
            jobTitle: result.title,
            education: this.arrayConvert(result.person.education),
            age: result.person.age,
            interests: this.arrayConvert(result.person.interests),
            phone: result.has_phone ? true : false,
            email: result.has_email  ? true : false,
            linkedin: result.person.personal_linkedin ? true : false,
            facebook: result.person.personal_facebook ? true : false,
            twitter: result.person.personal_twitter ? true : false,
            crunchbase: result.person.personal_crunchbase ? true : false,
            homePage: result.person.personal_homePage ? true : false,
            companyName: result.company.name,
            industry: this.arrayConvert(result.company.industries),
            revenue: (result.company.revenue).toLocaleString(),
            funding: (result.company.funding).toLocaleString(),
            companySize: (result.company.number_of_employees).toLocaleString(),
            companyLinkedin: result.company.company_linkedin ? true : false,
            companyTwitter: result.company.company_twitter ? true : false,
            companyHomePage: result.company.company_home_page ? true : false
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
