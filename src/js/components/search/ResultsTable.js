import React from "react"
import CSSModules from 'react-css-modules'

// import Styles from "./nav.css"

import Results from "./Results"

export default class ResultsTable extends React.Component {
  render(){
      let mappedResults = this.props.results.map((result, i) => {
        return (
          <Results key={i} name={result.results.name} jobTitle={result.results.job_title} company={result.results.company} employees={result.results.number_of_employees} industry={result.results.company_industry} city={result.results.company_city}/>
        )
      })

    return(
      <div class="ten columns">
        <table>
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
