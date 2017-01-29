import React, { Component } from "react";
import { Input, Tag, Chip } from 'react-materialize';
import { Link } from 'react-router';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery'

import PeopleSearch from "./PeopleSearch"
import CompanySearch from "./CompanySearch"

class SearchMenu extends Component {

  constructor(props) {
		super(props);
		this.state = {
      menuView: "job",
      inputTags: [],
			query: "",
      text_search: "",
      departmentList: {
        customerSupport: ["Customer Support", "Customer", "CSM", "support"],
        management: [ "Managment", "Chief", "COO", "CMO", "CFO", "CXO", "CTO", "CIO", "CCO", "CEO", "CLO", "CPO", "CRO", "Vp", "Vice President", "President", "Chairman", "Board of Directors", "BoD"],
        engineering: ["Engineering", "Engineer", "Technical", "CTO", "Information Technology", "Software", "Hardware", "technician"],
        finance: ["Finance", "CFO", "Financial", "Associate", "Accounting", "Accountant", "CPA", "Certified Public Accountant", "Account Manager", "Finance Analyst", "Cost", "finance", "corporate development", "M&A", "merger", "acquisition"],
        humanResources: ["Human", "Resources", "hr", "human resources", "payroll", "benefits", "onboarding", "Executive Assistant", "people operations", "campus ambassador", "recruiting", "recruit", "equal opportunity", "people", "conflict", "labor"],
        marketing: ["Marketing", "social media", "marketing", "content", "brand", "pay per click", "ppc", "advertising", "media", "public relations", "PR", "retention", "multi-channel", "funnel", "digital media", "affiliate", "campaign", "CRM"],
        operations: ["Operations", "COO", "operations", "operating", "wharehouse", "shipment", "shipping", "fleet", "packaging", "center director", "inventory", "assembly", "logistics", "facilities", "branch operations", "general manager", "supply chain"],
        sales: ["Sales", "sales", "CRO", "revenue", "account executive", "sdr", "business development", "inside sales rep", "isr", "field rep", "call center", "cold call", "funnel", "invoice"],
        rAndD: ["R&D", "research", "researcher", "lab", "product development", "R&D", "scientist", "clinical", "PhD", "chemical engineer", "intellectual property"],
        purchasing: ["Purchasing", "purchasing", "purchase", "buyer", "commodities", "procurement", "supply chain"],
        legal: ["Legal", "legal", "lawyer", "case manager", "intellectual property", "counsel", "paralegal", "legislative", "mergers & acquisitions", "M&A", "court", "conflict", "labor", "attorney", "litigation", "clerk"]
      }
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
    });
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
    const { userToken, onSearchChange, searchFilters, checked } = this.props;
    const { menuView } = this.state;

    return(
      <div class="nav navbar-default offset-by-one three columns gray">
        <div class="container-fluid white-background small-border large-padding gray-border">
          <p class="no-margin">SEARCH FILTERS</p>

          <form>

            <div class="filter">
              <label>Type</label>
              <Input checked={checked} onChange={this.typeCheck} name="type" id="job" value="job" type="radio" label="People" defaultChecked/>
              <Input checked={checked} onChange={this.typeCheck} name="type" id="company" value="company" type="radio" label="Company"/>
            </div>

            { menuView === "job" && <PeopleSearch userToken={userToken} onSearchChange={onSearchChange} searchFilters={searchFilters} departments={this.state.departmentList} /> }
            { menuView === "company" && <CompanySearch
              userToken={userToken} onSearchChange={onSearchChange} searchFilters={searchFilters}
              departments={this.state.departmentList}
            /> }

          </form>
        </div>
      </div>
    )
  }
}

export default SearchMenu;
