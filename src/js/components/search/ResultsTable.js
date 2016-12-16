import React from "react"
import CSSModules from 'react-css-modules'

// import Styles from "./nav.css"

import Results from "./Results"

export default class ResultsTable extends React.Component {
  render(){
    let mappedResults
    if (this.props.results.results !== undefined){
      mappedResults = this.props.results.results.map((result, i) => {
        return (
          <Results key={i} name={result.name} jobTitle={result.job_title} company={result.company} employees={result.number_of_employees} industry={result.company_industry} city={result.company_city}/>
        )
      })
    }

    return(
      <div class="ten columns">
        <table class="white-background small-border gray-border large-top-margin small-horizontal-padding">
          <thead>
            <tr>
              <th data-field="name">NAME</th>
              <th data-field="jobTitle">JOB TITLE</th>
              <th data-field="company">COMPANY</th>
              <th data-field="employees">EMPLOYEES</th>
              <th data-field="industry">INDUSTRY</th>
              <th data-field="city">CITY</th>
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
