import React from "react"
import { Input } from 'react-materialize'
import CSSModules from 'react-css-modules'

// import Styles from "./nav.css"

import Results from "./Results"

export default class ResultsTable extends React.Component {
  render(){
    let data = this.props.results
    let mappedResults
    if (data.results !== undefined){
      mappedResults = data.results.map((result, i) => {
        return (
          <Results key={result.id} name={result.person.name} age={result.person.age} jobTitle={result.title} companyName={result.company.name}/>
        )
      })
    }

    return(
      <div class="ten columns">
        <table class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <thead>
            <tr>
              <th><Input name='select-all' type='checkbox' value='select-all' /></th>
              <th class="table-head-styles" data-field="name">NAME</th>
              <th class="table-head-styles" data-field="age">AGE</th>
              <th class="table-head-styles" data-field="jobTitle">JOB TITLE</th>
              <th class="table-head-styles" data-field="companyName">COMPANY NAME</th>
            </tr>
          </thead>

          <tbody>
            {mappedResults}
          </tbody>
        </table>
      </div>
    )
  }
}
