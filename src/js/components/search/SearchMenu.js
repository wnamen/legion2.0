import React from "react"
import CSSModules from 'react-css-modules'
import { Input, Tag, Chip } from 'react-materialize'
import { debounce } from 'throttle-debounce';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery'

export default class SearchMenu extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      inputTags: [],
      value: "",
      suggestions: [],
			query: "",
      text_search: ""
		};
    this.getSearch = this.getSearch.bind(this);
    this.checkIt = this.checkIt.bind(this);
    this.getTag = debounce(750, this.getTag.bind(this));
    this.removeTag = this.removeTag.bind(this);
    this.handleDebouncer = this.handleDebouncer.bind(this);
	}

  checkIt(e) {
    console.log(this.props.checked);
    console.log(this.props.id);
    console.log(this.props.name);

    console.log(e.target);
    console.log(e.target.checked);
    console.log(e.target.name);


    // this.props.setApiState(this.props.index, !this.props.checked);
    // return;
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
    this.getSearch(e);
  }

  getTag(e) {
    e.persist();
    let new_tags = this.state.inputTags;

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

  getSearch(e) {
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

  handleDebouncer(e) {
    e.persist();
    this.getTag(e);
  }

  getIndustrySuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let text_search = `search_text=${value}`.trim();
    this.props.onIndustrySearch({ text: text_search });

    return inputLength === 0 ? [] : this.props.industrySuggestions.results.filter(result =>
      result.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getInterestSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let text_search = `search_text=${value}`.trim();
    this.props.onInterestSearch({ text: text_search });

    return inputLength === 0 ? [] : this.props.interestSuggestions.results.filter(result =>
      result.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getTechnologySuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let text_search = `search_text=${value}`.trim();
    this.props.onTechnologySearch({ text: text_search });

    return inputLength === 0 ? [] : this.props.technologySuggestions.results.filter(result =>
      result.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getIndustrySuggestionValue = suggestion => "";
  getInterestSuggestionValue = suggestion => "";
  getTechnologySuggestionValue = suggestion => "";

  renderIndustrySuggestion = suggestion => (
      <option value={suggestion.id} title="industry">{suggestion.name}</option>
  );

  renderInterestSuggestion = suggestion => (
    <option value={suggestion.id} title="interest">{suggestion.name}</option>
  );

  renderTechnologySuggestion = suggestion => (
    <option value={suggestion.id} title="technology">{suggestion.name}</option>
  );

  onIndustrySuggestionSearch = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onInterestSuggestionSearch = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onTechnologySuggestionSearch = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onIndustrySuggestionsFetchRequested = ({ value }) => {
     this.setState({
       suggestions: this.getIndustrySuggestions(value)
     });
  };

  onInterestSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getInterestSuggestions(value)
    });
  };

  onTechnologySuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getTechnologySuggestions(value)
    });
  };

  onIndustrySuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onInterestSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onTechnologySuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render(){
    const less_than = '<';

    const { value, suggestions } = this.state;
    const inputProps = {
      industry: {
        value,
        onChange: this.onIndustrySuggestionSearch
      },
      interest: {
        value,
        onChange: this.onInterestSuggestionSearch
      },
      technology: {
        value,
        onChange: this.onTechnologySuggestionSearch
      }
    };

    let tags = {
      keyword: [],
      job_title: [],
      name: [],
      company_name: [],
      education: [],
      location: [],
      industry: [],
      technology: [],
      interest: []
    }

    if (this.state.inputTags !== undefined){
      this.state.inputTags.map((tag) => {
        tags[tag.name].push(
          <a href="" id={tag.id} class="tags" onClick={this.removeTag} key={tag.id} name={tag.title || tag.name} value={tag.value}>{tag.value}&nbsp;&nbsp;&nbsp;x</a>
        );
      })
    }


    return(
      <div class="nav navbar-default offset-by-one three columns gray">
        <div class="container-fluid white-background small-border large-padding gray-border">
          <p class="margin-none">SEARCH FILTERS</p>

          <form>

            <div class="filter">
              <label>Type</label>
              <Input checked={this.props.checked} onChange={this.checkIt} name="type" id="people" value="people" type="radio" label="People" />
              <Input checked={this.props.checked} onChange={this.checkIt} name="type" id="company" value="company" type="radio" label="Company"/>
            </div>

            <div class="filter">
              <label>Keywords</label>
              <Input name="keyword" id="keywords" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.keyword}
              </div>
            </div>

            <Input type='select' name="department" label="Department" multiple>
              <option value="customer-support">Customer Support</option>
              <option value="c-suite">C-Suite</option>
              <option value="engineering">Engineering</option>
              <option value="finance">Finance</option>
              <option value="human-resources">Human Resources</option>
              <option value="marketing">Marketing</option>
              <option value="operations">Operations</option>
              <option value="sales">Sales</option>
            </Input>

            <div class="filter">
              <label>Job Title</label>
              <Input name="job_title" id="title" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.job_title}
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
              <label>Company Name</label>
              <Input name="company_name" id="company_name" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.company_name}
              </div>
            </div>

            <Input type='select' name="company_size" label="Size of Company" multiple>
              <option value="">{less_than}10</option>
              <option value="">11-50</option>
              <option value="">51-200</option>
              <option value="">201-500</option>
              <option value="">501-1,000</option>
              <option value="">1,001-5,000</option>
              <option value="">5,001-10,000</option>
              <option value="">10,000+</option>
            </Input>

            <Input type='select' label="Revenue" multiple>
              <option>{less_than}$500K</option>
              <option>$1M-$5M</option>
              <option>$5M-$10M</option>
              <option>$10M-$25M</option>
              <option>$25M-$35M</option>
              <option>$35M-$50M</option>
              <option>$50M-$75M</option>
              <option>$75M-$100M</option>
              <option>$100M-$200M</option>
              <option>$200M-$500M</option>
              <option>$500M-$1B</option>
              <option>$1B+</option>
            </Input>

            <Input type='select' label="Funding" >
              <option>{less_than}$500K</option>
              <option>$1M-$5M</option>
              <option>$5M-$10M</option>
              <option>$10M-$25M</option>
              <option>$25M-$35M</option>
              <option>$35M-$50M</option>
              <option>$50M-$75M</option>
              <option>$75M-$100M</option>
              <option>$100M-$200M</option>
              <option>$200M-$500M</option>
              <option>$500M-$1B</option>
              <option>$1B+</option>
            </Input>

            <div class="filter">
              <label>Technology</label>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionSelected={this.handleDebouncer}
                onSuggestionsFetchRequested={this.onTechnologySuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onTechnologySuggestionsClearRequested}
                getSuggestionValue={this.getTechnologySuggestionValue}
                renderSuggestion={this.renderTechnologySuggestion}
                inputProps={inputProps.technology}
              />
              <div class="tag-container">
                {tags.technology}
              </div>
            </div>

            <div class="filter">
              <label>Industry</label>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionSelected={this.handleDebouncer}
                onSuggestionsFetchRequested={this.onIndustrySuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onIndustrySuggestionsClearRequested}
                getSuggestionValue={this.getIndustrySuggestionValue}
                renderSuggestion={this.renderIndustrySuggestion}
                inputProps={inputProps.industry}
              />
              <div class="tag-container">
                {tags.industry}
              </div>
            </div>

            <div class="filter">
              <label>Education</label>
              <Input name="education" id="education" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.education}
              </div>
            </div>

            <Input type='select' label="Person's Age" multiple>
              <option>{less_than}$500K</option>
              <option>$1M-$5M</option>
              <option>$5M-$10M</option>
              <option>$10M-$25M</option>
              <option>$25M-$35M</option>
              <option>$35M-$50M</option>
              <option>$50M-$75M</option>
              <option>$75M-$100M</option>
              <option>$100M-$200M</option>
              <option>$200M-$500M</option>
              <option>$500M-$1B</option>
              <option>$1B+</option>
            </Input>

            <div class="filter">
              <label>Interest</label>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionSelected={this.handleDebouncer}
                onSuggestionsFetchRequested={this.onInterestSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onInterestSuggestionsClearRequested}
                getSuggestionValue={this.getInterestSuggestionValue}
                renderSuggestion={this.renderInterestSuggestion}
                inputProps={inputProps.interest}
              />
              <div class="tag-container">
                {tags.interest}
              </div>
            </div>

            <div class="filter">
              <label>Social Profiles</label>
              <Input name='personal_facebook' type='checkbox' value='facebook' label='Facebook' />
              <Input name='personal_linkedin' type='checkbox' value='linkedin' label='Linkedin' />
              <Input name='personal_twitter' type='checkbox' value='twitter' label='Twitter' />
              <Input name='personal_github' type='checkbox' value='github' label='Github' />
              <Input name='personal_pinterest' type='checkbox' value='pinterest' label='Pinterest' />
              <Input name='personal_instagram' type='checkbox' value='instagram' label='Instagram' />
              <Input name='personal_wikipedia' type='checkbox' value='wikipedia' label='Wikipedia' />
            </div>

            <div class="filter">
              <label>Location</label>
              <Input name="location" id="location" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.location}
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }
}
