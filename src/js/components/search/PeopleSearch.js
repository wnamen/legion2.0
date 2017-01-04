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
    this.getTag = debounce(850, this.getTag.bind(this));
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

    if ((e.target.title === 'industry') || (e.target.title === 'interest') ) {
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
              <label>Name</label>
              <Input name="name" id="name" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.name}
              </div>
            </div>

            <div class="filter">
              <label>Job Title</label>
              <Input name="job_title" id="title" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.job_title}
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
              <IndustrySearch onDebouncer={this.handleDebouncer}/>
              <div class="tag-container">
                {tags.industry}
              </div>
            </div>

            <Input type='select' name="department" label="Department" onChange={this.handleSelected} multiple>
              <option value="customer-support">Customer Support</option>
              <option value="c_suite">C-Suite</option>
              <option value="engineering">Engineering</option>
              <option value="finance">Finance</option>
              <option value="human_resources">Human Resources</option>
              <option value="marketing">Marketing</option>
              <option value="operations">Operations</option>
              <option value="sales">Sales</option>
            </Input>

            <div class="filter">
              <label>Education</label>
              <Input name="education" id="education" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.education}
              </div>
            </div>

            <Input type='select' name="person_age" label="Person's Age" onChange={this.handleSelected} multiple>
              <option value="18-22">18-22</option>
              <option value="23-30">23-30</option>
              <option value="31-35">31-35</option>
              <option value="46-60">46-60</option>
              <option value="61">60+</option>
            </Input>

            <div class="filter">
              <label>Interest</label>
              <InterestSearch onDebouncer={this.handleDebouncer}/>
              <div class="tag-container">
                {tags.interest}
              </div>
            </div>

            <div class="filter">
              <label>Social Profiles</label>
              <Input checked={this.props.checked} onChange={this.socialCheck} name='facebook' type='checkbox' value="0" label='Facebook' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='linkedin' type='checkbox' value="1" label='Linkedin' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='twitter' type='checkbox' value="2" label='Twitter' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='github' type='checkbox' value="3" label='Github' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='pinterest' type='checkbox' value="4" label='Pinterest' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='instagram' type='checkbox' value="5" label='Instagram' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='wikipedia' type='checkbox' value="6" label='Wikipedia' />
            </div>

            <div class="filter">
              <label>Location</label>
              <Input name="location" id="location" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.location}
              </div>
            </div>
          </div>
    )
  }
}
