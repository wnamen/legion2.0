import React from "react"
import CSSModules from 'react-css-modules'
// import Styles from "./nav.css"

import Results from "./Results"

export default class ResultsTable extends React.Component {
  render(){
    console.log(this.props.results);
    let results = this.props.results.map((result, i) => {
      return (
        <Results key={i} name={result.name} jobTitle={result.jobTitle} company={result.company} employees={result.employees} industry={result.industry} city={result.city}/>
      )
    })
    console.log(results);
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
            {results}
          </tbody>
        </table>
      </div>
    )
  }
}
