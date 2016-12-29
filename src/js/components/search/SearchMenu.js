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
      menuView: "people",
      inputTags: [],
			query: "",
      text_search: ""
		};
    this.getSearch = this.getSearch.bind(this);
    this.typeCheck = this.typeCheck.bind(this);
	}

  componentDidMount(){
    this.setState({
      people: this.props.apiState.people,
      companies: this.props.apiState.companies
    })
  }

  typeCheck(e) {
    let type = e.target.value;
    const companyCheck = ((type === 'companies') && (this.props.apiState.companies === true));
    const peopleCheck = ((type === 'people') && (this.props.apiState.people === true));

    if (peopleCheck || companyCheck) {
      return
    }

    this.props.setApiState(this.props.checked);
    this.setState({
      menuView: type,
      inputTags:[]
    })
    this.getSearch();
  }

  getSearch() {
    let query = "";
    this.state.inputTags.forEach((target) => {
      if ((target.name === 'industry') || (target.name === 'interest') ||(target.name === 'technology')) {
        query = query + `${target.name}=${target.index}&`;
      } else {
        query = query + `${target.name}=${target.value}&`;
      }
    });

    this.setState({ query: query });
    this.props.onSearchChange({ text: query });
  }

  render(){
    return(
      <div class="nav navbar-default offset-by-one three columns gray">
        <div class="container-fluid white-background small-border large-padding gray-border">
          <p class="margin-none">SEARCH FILTERS</p>

          <form>

            <div class="filter">
              <label>Type</label>
              <Input checked={this.props.checked} onChange={this.typeCheck} name="type" id="people" value="people" type="radio" label="People" defaultChecked/>
              <Input checked={this.props.checked} onChange={this.typeCheck} name="type" id="companies" value="companies" type="radio" label="Company"/>
            </div>

            { this.state.menuView === "people" && <PeopleSearch onSearchChange={this.props.onSearchChange} /> }
            { this.state.menuView === "companies" && <CompanySearch onSearchChange={this.props.onSearchChange} /> }

          </form>
        </div>
      </div>
    )
  }
}
