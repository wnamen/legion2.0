import React from "react"
import CSSModules from 'react-css-modules'
import { Input, Tag, Chip } from 'react-materialize'
import { debounce } from 'throttle-debounce';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery'

import PeopleSearch from "./PeopleSearch"
import CompanySearch from "./CompanySearch"

export default class SearchMenu extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      menuView: "job",
      inputTags: [],
			query: "",
      text_search: ""
		};
    this.getSearch = this.getSearch.bind(this);
    this.typeCheck = this.typeCheck.bind(this);
	}

  typeCheck(e) {
    let type = e.target.value;
    const companyCheck = ((type === 'company') && (this.props.apiState.company === true));
    const peopleCheck = ((type === 'job') && (this.props.apiState.job === true));

    if (peopleCheck || companyCheck) {
      return
    }

    this.props.setApiState();
    this.setState({
      menuView: type,
      inputTags:[]
    })
    this.getSearch(type);
  }

  getSearch(apiState) {
    let query = "";
    this.state.inputTags.forEach((target) => {
      if ((target.name === 'industry') || (target.name === 'interest') ||(target.name === 'technology')) {
        query = query + `${target.name}=${target.index}&`;
      } else {
        query = query + `${target.name}=${target.value}&`;
      }
    });

    this.setState({ query: query });
    this.props.onSearchChange({ text: query }, apiState);
  }

  render(){
    return(
      <div class="nav navbar-default offset-by-one three columns gray">
        <div class="container-fluid white-background small-border large-padding gray-border">
          <p class="no-margin">SEARCH FILTERS</p>

          <form>

            <div class="filter">
              <label>Type</label>
              <Input checked={this.props.checked} onChange={this.typeCheck} name="type" id="job" value="job" type="radio" label="People" defaultChecked/>
              <Input checked={this.props.checked} onChange={this.typeCheck} name="type" id="company" value="company" type="radio" label="Company"/>
            </div>

            { this.state.menuView === "job" && <PeopleSearch userToken={this.props.userToken} onSearchChange={this.props.onSearchChange} /> }
            { this.state.menuView === "company" && <CompanySearch userToken={this.props.userToken} onSearchChange={this.props.onSearchChange} /> }

          </form>
        </div>
      </div>
    )
  }
}
