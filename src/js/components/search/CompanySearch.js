import React, { Component } from "react"
import { Input, Tag, Chip } from 'react-materialize'
import { debounce } from 'throttle-debounce';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery'

import IndustrySearch from "../../actions/search/IndustrySearch"
import TechnologySearch from "../../actions/search/TechnologySearch"


class CompanySearch extends Component {

  constructor(props) {
		super(props);
		this.state = {
      inputTags: [],
			query: "",
      text_search: "",
      selected: []
		};
    this.getSearch = this.getSearch.bind(this);
    this.getTag = debounce(1000, this.getTag.bind(this));
    this.removeTag = this.removeTag.bind(this);
    this.handleDebouncer = this.handleDebouncer.bind(this);
	}

  handleSelected = (e) => {
    let current_tags = this.state.current_tags != undefined ? this.state.current_tags: [];
    let selectedName = `${e.target.name}__`;

    var nums = [];
    for (var i = 0; i < e.target.selectedOptions.length; i++) {
      var options = e.target.selectedOptions[i].value.split("-");
      for (var k = 0; k < options.length; k++) {
        nums.push(parseFloat(options[k]));
    }
  }

    console.log(nums);
    var min_of_array = Math.min.apply(Math, nums);
    var max_of_array = Math.max.apply(Math, nums);

    current_tags.push({
      id: current_tags.length > 0 ? current_tags[current_tags.length-1].id + 1 : 1,
      name: selectedName+"gte",
      value: min_of_array
    })

    if (nums.length % 2 == 0) {  // didn't append a result with one option
      current_tags.push({
        id: current_tags.length > 0 ? current_tags[current_tags.length-1].id + 1 : 1,
        name: selectedName+"lte",
        value: max_of_array
      })

    }
    this.setState({ inputTags: current_tags });
    this.getSearch();
  };


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

    if ((e.target.title === 'industries') || (e.target.title === 'technologies')) {
      new_tags.push({
        id: new_tags.length > 0 ? new_tags[new_tags.length-1].id + 1 : 1,
        name: e.target.title,
        value: e.target.value
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
      query = query + `${target.name}=${target.value}&`;
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
    const { inputTags } = this.state;
    const { checked, userToken, searchFilters } = this.props;
    let tags = {};

    if (inputTags !== undefined){

      inputTags.map(tag => {

        if (tags[tag.name] !== undefined) {
          tags[tag.name].push(
            <a href="" id={tag.id} class="tags" onClick={this.removeTag} key={tag.id} name={tag.title || tag.name} value={tag.value}>{tag.value}&nbsp;&nbsp;&nbsp;x</a>
          )
        } else {
          tags[tag.name] = [
            <a href="" id={tag.id} class="tags" onClick={this.removeTag} key={tag.id} name={tag.title || tag.name} value={tag.value}>{tag.value}&nbsp;&nbsp;&nbsp;x</a>
          ]
        }
      });
    }

    return(
          <div>
            <div class="filter">
              <label>Keywords</label>
              <Input name="keywords" id="keywords" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.keywords}
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
              <IndustrySearch onDebouncer={this.handleDebouncer} userToken={userToken} />
              <div class="tag-container">
                {tags.industries}
              </div>
            </div>

            <label>Company Size {advanced_filter}</label>
            <Input type='select' name="company_size" data-id="size" onChange={this.handleSelected} disabled={searchFilters} multiple>
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
            <Input type='select' name="revenue" data-id="revenue" onChange={this.handleSelected} disabled={searchFilters} multiple>
              <option value="0-500000">{less_than}$500K</option>
              <option value="1000000-5000000">$1M-$5M</option>
              <option value="5000000-10000000">$5M-$10M</option>
              <option value="10000000-25000000">$10M-$25M</option>
              <option value="25000000-35000000">$25M-$35M</option>
              <option value="35000000-50000000">$35M-$50M</option>
              <option value="50000000-75000000">$50M-$75M</option>
              <option value="75000000-100000000">$75M-$100M</option>
              <option value="100000000-200000000">$100M-$200M</option>
              <option value="200000000-500000000">$200M-$500M</option>
              <option value="500000000-1000000000">$500M-$1B</option>
              <option value="1000000000">$1B+</option>
            </Input>

            <label>Funding {advanced_filter}</label>
            <Input type='select' name="funding" data-id="funding" onChange={this.handleSelected} disabled={searchFilters} multiple>
              <option value="0-500000">{less_than}$500K</option>
              <option value="1000000-5000000">$1M-$5M</option>
              <option value="5000000-10000000">$5M-$10M</option>
              <option value="10000000-25000000">$10M-$25M</option>
              <option value="25000000-35000000">$25M-$35M</option>
              <option value="35000000-50000000">$35M-$50M</option>
              <option value="50000000-75000000">$50M-$75M</option>
              <option value="75000000-100000000">$75M-$100M</option>
              <option value="100000000-200000000">$100M-$200M</option>
              <option value="200000000-500000000">$200M-$500M</option>
              <option value="500000000-1000000000">$500M-$1B</option>
              <option value="1000000000">$1B+</option>
            </Input>

            <div class="filter">
              <label>Technology <small>Advanced Filter</small></label>
              <TechnologySearch onDebouncer={this.handleDebouncer} userToken={userToken} disabled={searchFilters} />
              <div class="tag-container">
                {tags.technologies}
              </div>
            </div>

            <div class="filter">
              <label>Social Profiles <small>Advanced Filter</small></label>
              <Input checked={checked} onChange={this.socialCheck} name='has_facebook' type='checkbox' value="0" label='Facebook' disabled={searchFilters} />
              <Input checked={checked} onChange={this.socialCheck} name='has_linkedin' type='checkbox' value="1" label='Linkedin' disabled={searchFilters} />
              <Input checked={checked} onChange={this.socialCheck} name='has_twitter' type='checkbox' value="2" label='Twitter' disabled={searchFilters} />
              <Input checked={checked} onChange={this.socialCheck} name='has_github' type='checkbox' value="3" label='Github' disabled={searchFilters} />
              <Input checked={checked} onChange={this.socialCheck} name='has_pinterest' type='checkbox' value="4" label='Pinterest' disabled={searchFilters} />
              <Input checked={checked} onChange={this.socialCheck} name='has_instagram' type='checkbox' value="5" label='Instagram' disabled={searchFilters} />
              <Input checked={checked} onChange={this.socialCheck} name='has_wikipedia' type='checkbox' value="6" label='Wikipedia' disabled={searchFilters} />
            </div>
          </div>
    )
  }
}

export default CompanySearch;
