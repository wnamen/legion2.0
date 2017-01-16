import React from "react"
import CSSModules from 'react-css-modules'
import { Input, Tag, Chip } from 'react-materialize'
import { debounce } from 'throttle-debounce';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery'

import IndustrySearch from "../../actions/search/IndustrySearch"
import TechnologySearch from "../../actions/search/TechnologySearch"

export default class CompanySearch extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      inputTags: [],
			query: "",
      text_search: ""
		};
    this.getSearch = this.getSearch.bind(this);
    this.getTag = debounce(1000, this.getTag.bind(this));
    this.removeTag = this.removeTag.bind(this);
    this.handleDebouncer = this.handleDebouncer.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
	}

  handleSelected(e) {
    let selectedLength = e.target.selectedOptions.length;
    let selectedName = e.target.name;
    let selected = [];

    for (let i = 0; i < selectedLength; i++) {
      let option = e.target.selectedOptions[i];
      selected.push({name: selectedName, value: option.value})
    }
  }

  removeTag(e) {
    e.preventDefault();
    let current_tags = this.state.inputTags;
    let target_id = parseInt(e.target.id);


    current_tags.forEach((tag, idx) => {
      if ((tag.id) === target_id) {
        current_tags.splice(idx, 1);
      }
    });

    this.setState({inputTags: current_tags});
    this.getSearch();
  }

  getTag(e) {
    e.persist();
    let new_tags = this.state.inputTags;

    if ((e.target.value).length === 0) {
      return
    }

    if ((e.target.title === 'industry') || (e.target.title === 'interest') ||(e.target.title === 'technology')) {
      new_tags.push({
        id: new_tags.length > 0 ? new_tags[new_tags.length-1].id + 1 : 1,
        name: e.target.title,
        value: e.target.label,
        index: e.target.value
      });
    } else {
      new_tags.push({
        id: new_tags.length > 0 ? new_tags[new_tags.length-1].id + 1 : 1,
        name: e.target.name,
        value: e.target.value
      });
    }

    this.setState({inputTags: new_tags});
    this.getSearch(e);
    e.target.value = "";
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

    console.log(query);

    this.setState({ query: query });
    this.props.onSearchChange({ text: query });
  }

  handleDebouncer(e) {
    e.persist();
    this.getTag(e);
  }

  render(){
    const less_than = '<';
    const advanced_filter = <small>Advanced Filter</small>;

    let tags = {}

    if (this.state.inputTags !== undefined){
      this.state.inputTags.map((tag) => {
        if (tags[tag.name] !== undefined) {
          tags[tag.name].push(
            <a href="" id={tag.id} class="tags" onClick={this.removeTag} key={tag.id} name={tag.title || tag.name} value={tag.value}>{tag.value}&nbsp;&nbsp;&nbsp;x</a>
          )
        } else {
          tags[tag.name] = [
            <a href="" id={tag.id} class="tags" onClick={this.removeTag} key={tag.id} name={tag.title || tag.name} value={tag.value}>{tag.value}&nbsp;&nbsp;&nbsp;x</a>
          ]
        };
      });
    }


    return(
          <div>
            <div class="filter">
              <label>Keywords</label>
              <Input name="keyword" id="keywords" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.keyword}
              </div>
            </div>

            <div class="filter">
              <label>Company Name</label>
              <Input name="company_name" id="company_name" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.company_name}
              </div>
            </div>

            <div class="filter">
              <label>Location</label>
              <Input name="location" id="location" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.location}
              </div>
            </div>

            <div class="filter">
              <label>Industry</label>
              <IndustrySearch onDebouncer={this.handleDebouncer} userToken={this.props.userToken} />
              <div class="tag-container">
                {tags.industry}
              </div>
            </div>

            <label>Company Size {advanced_filter}</label>
            <Input type='select' name="company_size" onChange={this.handleSelected} disabled={this.props.searchFilters} multiple>
              <option value="0-10">{less_than}10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="501-1000">501-1,000</option>
              <option value="1001-5000">1,001-5,000</option>
              <option value="5001-10000">5,001-10,000</option>
              <option value="10001">10,000+</option>
            </Input>

            <label>Revenue {advanced_filter}</label>
            <Input type='select' name="revenue" onChange={this.handleSelected} disabled={this.props.searchFilters} multiple>
              <option value="0-0.5">{less_than}$500K</option>
              <option value="1-5">$1M-$5M</option>
              <option value="5-10">$5M-$10M</option>
              <option value="10-25">$10M-$25M</option>
              <option value="25-35">$25M-$35M</option>
              <option value="35-50">$35M-$50M</option>
              <option value="50-75">$50M-$75M</option>
              <option value="75-100">$75M-$100M</option>
              <option value="100-200">$100M-$200M</option>
              <option value="200-500">$200M-$500M</option>
              <option value="500-1000">$500M-$1B</option>
              <option value="1001">$1B+</option>
            </Input>

            <label>Funding {advanced_filter}</label>
            <Input type='select' name="funding" onChange={this.handleSelected} disabled={this.props.searchFilters} multiple>
              <option value="0-0.5">{less_than}$500K</option>
              <option value="1-5">$1M-$5M</option>
              <option value="5-10">$5M-$10M</option>
              <option value="10-25">$10M-$25M</option>
              <option value="25-35">$25M-$35M</option>
              <option value="35-50">$35M-$50M</option>
              <option value="50-75">$50M-$75M</option>
              <option value="75-100">$75M-$100M</option>
              <option value="100-200">$100M-$200M</option>
              <option value="200-500">$200M-$500M</option>
              <option value="500-1000">$500M-$1B</option>
              <option value="1001">$1B+</option>
            </Input>

            <div class="filter">
              <label>Technology <small>Advanced Filter</small></label>
              <TechnologySearch onDebouncer={this.handleDebouncer} userToken={this.props.userToken} disabled={this.props.searchFilters} />
              <div class="tag-container">
                {tags.technology}
              </div>
            </div>

            <div class="filter">
              <label>Social Profiles <small>Advanced Filter</small></label>
              <Input checked={this.props.checked} onChange={this.socialCheck} name='facebook' type='checkbox' value="0" label='Facebook' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='linkedin' type='checkbox' value="1" label='Linkedin' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='twitter' type='checkbox' value="2" label='Twitter' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='github' type='checkbox' value="3" label='Github' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='pinterest' type='checkbox' value="4" label='Pinterest' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='instagram' type='checkbox' value="5" label='Instagram' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='wikipedia' type='checkbox' value="6" label='Wikipedia' disabled={this.props.searchFilters} />
            </div>
          </div>
    )
  }
}
