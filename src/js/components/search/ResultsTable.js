import React from "react";
import { Dropdown, NavItem, Input } from "react-materialize";
import { AgGrid } from 'ag-grid/main';
import { AgGridReact } from 'ag-grid-react';
import Spinner from "react-spinkit";

// import Results from "./Results";

export default class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: "",
      previous: "",
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-remove"/>',
        filter: '<i class="fa fa-filter"/>',
        sortAscending: '<i class="fa fa-long-arrow-down"/>',
        sortDescending: '<i class="fa fa-long-arrow-up"/>',
        groupExpanded: '<i class="fa fa-minus-square-o"/>',
        groupContracted: '<i class="fa fa-plus-square-o"/>',
        columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
        columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
      }
    };
  }

  onGridReady(params) {
      this.api = params.api;
      this.columnApi = params.columnApi;
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

  // componentDidMount() {
  //   this.setState({ next: this.props.results.next, previous: this.props.results.previous });
  // }

  render() {
    // const peopleTitles = ["name","company_name","job_title","industry","department","education","age","interest","social_profiles","location"];
    // const companyTitle = ["company_name","industry","department","company_size","revenue","funding","technology","social_profiles","location"];

    let data = this.props.results;
    let mappedResults;
    let peopleHeader = [{headerName: '', width: 30, checkboxSelection: true, suppressSorting: true, suppressMenu: true, pinned: true},{headerName:"Name", field:"name", width: 130}, {headerName:"Age", field:"age", width: 130}, {headerName:"Job Title", field:"jobTitle", width: 130}, {headerName:"Company",field:"companyName", width: 130}];

    if ((data.results !== undefined) && (data.results.length > 0)) {
      mappedResults = data.results.map((result, index) => {
        return (
          {name: result.person.name, age: result.person.age, jobTitle:result.title, companyName:result.company.name}
        );

        // return (
        //   <Results index={index} key={result.id} name={result.person.name} age={result.person.age} jobTitle={result.title} companyName={result.company.name} checked={this.props.rowState[index]} callback={this.props.checkRow} />
        // );
      })
    } else if (data.results !== undefined) {
      return (
        <div class="eleven columns">
          <div id="noResultsContainer" class="white-background">
            <img id="noResultsImg" src="src/img/no_search_results.png" />
            <span id="noResultsMessage" class="electric-blue">No Search Results</span>
          </div>
        </div>
      )
    } else {
      return (
        <Spinner spinnerName="cube-grid" />
      )
    }

    console.log(mappedResults);

    return(
      <div class="eleven columns">
        <div id="resultTable" class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <AgGridReact
            onGridReady={this.onGridReady.bind(this)}
            onRowSelected={this.onRowSelected.bind(this)}
            onCellClicked={this.onCellClicked.bind(this)}

            icons={this.state.icons}

            columnDefs={peopleHeader}
            rowData={mappedResults}

            rowSelection="multiple"
            enableColResize="true"
            enableSorting="true"
            groupHeaders="true"
            rowHeight="30"
            rowWidth="130"
          />
      </div>
    </div>
    );
  }
}



// <div class="eleven columns">
//   <table class="white-background small-border gray-border large-top-margin small-horizontal-padding">
//     <thead>
//       <tr>
//         <th class="table-selector"><Input name='select-all' type='checkbox' value='select-all' label=' ' checked={this.props.checked} onChange={this.props.checkAll} /></th>
//         <th class="table-head-styles" data-field="name">NAME</th>
//         <th class="table-head-styles" data-field="age">AGE</th>
//         <th class="table-head-styles" data-field="jobTitle">JOB TITLE</th>
//         <th class="table-head-styles" data-field="companyName">COMPANY NAME</th>
//         <th class="table-head-styles" id="column-adder">
//           <Dropdown trigger={
//               <a><i class="fa fa-bars" aria-hidden="true"></i></a>
//             }>
//             <NavItem>Add Column</NavItem>
//             <NavItem>Add Column</NavItem>
//           </Dropdown>
//           <Input type='select' name="column_selector" onChange={this.handleSelected} multiple>
//             <option value="name">Name</option>
//             <option value="person_age">Age</option>
//             <option value="job_title">Job Title</option>
//             <option value="department">Department</option>
//             <option value="company_name">Company Name</option>
//             <option value="company_size">Size of Company</option>
//             <option value="revenue">Revenue</option>
//             <option value="funding">Funding</option>
//             <option value="technology">Technology</option>
//             <option value="industry">Industry</option>
//             <option value="interest">Interest</option>
//             <option value="social_profiles">Social Profiles</option>
//             <option value="location">Location</option>
//           </Input>
//         </th>
//       </tr>
//     </thead>
//
//     <tbody>
//       {mappedResults}
//     </tbody>
//   </table>
// </div>
