import React from 'react';
import { Dropdown, NavItem, Input } from 'react-materialize';
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
    console.log(this.state);
  }

  render() {
    let data = this.props.results;
    let mappedResults;
    if (data.results !== undefined) {
      mappedResults = data.results.map((result) => {
        return (
          <Results key={result.id} name={result.person.name} age={result.person.age} jobTitle={result.title} companyName={result.company.name}/>
        );
      })
    }

    return(
      <div class="ten columns">
        <table class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <thead>
            <tr>
              <th class="table-selector"><Input name='select-all' type='checkbox' value='select-all' label=' '/></th>
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
