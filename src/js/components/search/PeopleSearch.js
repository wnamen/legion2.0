import React from "react"
import CSSModules from 'react-css-modules'
import { Input, Tag, Chip } from 'react-materialize'
import { debounce } from 'throttle-debounce';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery'

import IndustrySearch from "../../actions/search/IndustrySearch"
import InterestSearch from "../../actions/search/InterestSearch"

export default class PeopleSearch extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      inputTags: [],
			query: "",
      text_search: ""
		};
    this.getSearch = this.getSearch.bind(this);
    this.socialCheck = this.socialCheck.bind(this);
    this.getTag = debounce(1000, this.getTag.bind(this));
    this.removeTag = this.removeTag.bind(this);
    this.handleDebouncer = this.handleDebouncer.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
	}

  handleSelected(e) {
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
  }

  socialCheck(e) {
    let current_tags = this.state.inputTags;
    let status = e.target.checked;
    let name = e.target.name;
    let target_id = parseInt(e.target.value);

    if (status) {
      current_tags.push({
        id: current_tags.length > 0 ? current_tags[current_tags.length-1].id + 1 : 1,
        name: name,
        value: status
      });
    } else {
      current_tags.forEach((tag, idx) => {
        if ((tag.name) === name) {
          current_tags.splice(idx, 1);
        }
      });
    }
    this.setState({inputTags: current_tags});
    this.getSearch();
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

    if ((e.target.title === 'industries') || (e.target.title === 'interests') ) {
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

  getSearch(search) {
    let query = "";
    this.state.inputTags.forEach((target) => {
      query = query + `${target.name}=${target.value}&`;
    });

    this.setState({ query: query });
    this.props.onSearchChange({ text: query });
  }

  handleDebouncer(e) {
    e.persist();
    this.getTag(e);
  }

  render(){
    const advanced_filter = <small>Advanced Filter</small>;
    const less_than = '<';
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
              <Input name="keywords" id="keywords" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.keywords}
              </div>
            </div>

            <div class="filter">
              <label>Name</label>
              <Input name="person_name" id="name" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.person_name}
              </div>
            </div>

            <div class="filter">
              <label>Job Title</label>
              <Input name="title" id="title" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.title}
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
              <label>Company Name</label>
              <Input name="company_name" id="company_name" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.company_name}
              </div>
            </div>

            <div class="filter">
              <label>Industry</label>
              <IndustrySearch onDebouncer={this.handleDebouncer} userToken={this.props.userToken} />
              <div class="tag-container">
                {tags.industries}
              </div>
            </div>

            <label>Department {advanced_filter}</label>
            <Input type='select' name="department" onChange={this.handleSelected} disabled={this.props.searchFilters} multiple>
              <option value="customer-support">Customer Support</option>
              <option value="c_suite">C-Suite</option>
              <option value="engineering">Engineering</option>
              <option value="finance">Finance</option>
              <option value="human_resources">Human Resources</option>
              <option value="legal">Legal</option>
              <option value="marketing">Marketing</option>
              <option value="operations">Operations</option>
              <option value="purchasing">Purchasing</option>
              <option value="r&d">R&D</option>
              <option value="sales">Sales</option>
            </Input>

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
              <label>Education <small>Advanced Filter</small></label>
              <Input name="education" id="education" onChange={this.handleDebouncer} disabled={this.props.searchFilters} />
              <div class="tag-container">
                {tags.education}
              </div>
            </div>

            <label>Person's Age {advanced_filter}</label>
            <Input type='select' name="age" onChange={this.handleSelected} disabled={this.props.searchFilters} multiple>
              <option value="18-22">18-22</option>
              <option value="23-30">23-30</option>
              <option value="31-35">31-35</option>
              <option value="46-60">46-60</option>
              <option value="61">60+</option>
            </Input>

            <div class="filter" >
              <label>Interest <small>Advanced Filter</small></label>
              <InterestSearch onDebouncer={this.handleDebouncer} userToken={this.props.userToken} disabled={this.props.searchFilters} />
              <div class="tag-container">
                {tags.interests}
              </div>
            </div>

            <div class="filter">
              <label>Social Profiles <small>Advanced Filter</small></label>
              <Input checked={this.props.checked} onChange={this.socialCheck} name='has_facebook' type='checkbox' value="0" label='Facebook' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='has_linkedin' type='checkbox' value="1" label='Linkedin' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='has_angellist' type='checkbox' value="4" label='Angellist' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='has_crunchbase' type='checkbox' value="3" label='Crunchbase' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='has_twitter' type='checkbox' value="2" label='Twitter' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='has_instagram' type='checkbox' value="5" label='Instagram' disabled={this.props.searchFilters} />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='has_wikipedia' type='checkbox' value="6" label='Wikipedia' disabled={this.props.searchFilters} />
            </div>
          </div>
    )
  }
}
