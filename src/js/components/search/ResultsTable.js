import React from 'react';
import { Dropdown, NavItem, Input } from 'react-materialize';
import {Table, Column, Cell} from 'fixed-data-table-2';
// import CSSModules from 'react-css-modules';

// import Styles from "./nav.css"

import Results from './Results';

export default class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: '',
      previous: '',
    };
  }

  componentDidMount() {
    this.setState({ next: this.props.results.next, previous: this.props.results.previous });
  }

  render() {
    let data = this.props.results;
    let mappedResults;

    if ((data.results !== undefined) && (data.results.length > 0)) {
      mappedResults = data.results.map((result, index) => {
        return (
          <Results index={index} key={result.id} name={result.person.name} age={result.person.age} jobTitle={result.title} companyName={result.company.name} checked={this.props.rowState[index]} callback={this.props.checkRow} />
        );
      })
    } else if (data.results !== undefined) {
      return (
        <img class="eleven columns" src="src/img/no_search_results.png" />
      )
    }

    return(
      <div class="eleven columns">
        <table class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <thead>
            <tr>
              <th class="table-selector"><Input name='select-all' type='checkbox' value='select-all' label=' ' checked={this.props.checked} onChange={this.props.checkAll} /></th>
              <th class="table-head-styles" data-field="name">NAME</th>
              <th class="table-head-styles" data-field="age">AGE</th>
              <th class="table-head-styles" data-field="jobTitle">JOB TITLE</th>
              <th class="table-head-styles" data-field="companyName">COMPANY NAME</th>
              <th class="table-head-styles" id="column-adder">
                <Dropdown trigger={
                  <a><i class="fa fa-bars" aria-hidden="true"></i></a>
                }>
                  <NavItem>Add Column</NavItem>
                  <NavItem>Add Column</NavItem>
                </Dropdown>
                <Input type='select' name="column_selector" onChange={this.handleSelected} multiple>
                  <option value="name">Name</option>
                  <option value="person_age">Age</option>
                  <option value="job_title">Job Title</option>
                  <option value="department">Department</option>
                  <option value="company_name">Company Name</option>
                  <option value="company_size">Size of Company</option>
                  <option value="revenue">Revenue</option>
                  <option value="funding">Funding</option>
                  <option value="technology">Technology</option>
                  <option value="industry">Industry</option>
                  <option value="interest">Interest</option>
                  <option value="social_profiles">Social Profiles</option>
                  <option value="location">Location</option>
                </Input>
              </th>
            </tr>
          </thead>

          <tbody>
            {mappedResults}
          </tbody>
        </table>
      </div>
    );
  }
}
