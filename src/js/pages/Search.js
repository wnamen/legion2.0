import React, { Component } from "react"
import { Link } from "react-router"

import ActionBar from "../components/search/ActionBar"
import SearchMenu from "../components/search/SearchMenu"
import ResultsTable from "../components/search/ResultsTable"

export default class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      results: [
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        },
        {
          name:'William',
          jobTitle:'Software Engineer',
          company:'Legion Analytics',
          employees:'<10',
          industry:'Technology',
          city:'San Francisco'
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <div class="container-fluid">
          <div class="row">
            <div class="sixteen columns">
              <SearchMenu />
              <ActionBar />
              <ResultsTable results={this.state.results} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
