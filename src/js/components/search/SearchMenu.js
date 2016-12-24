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
    this.typeCheck = this.typeCheck.bind(this);
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

    console.log(selected);
  }

  componentDidMount(){
    this.setState({
      people: this.props.apiState.people,
      companies: this.props.apiState.companies
    })
  }

  typeCheck(e) {
    let status = e.target.checked;
    let type = e.target.value;
    const companyCheck = ((type === 'companies') && (this.props.apiState.companies === true));
    const peopleCheck = ((type === 'people') && (this.props.apiState.people === true));

    if (peopleCheck || companyCheck) {
      return
    }

    this.props.setApiState(!this.props.checked);
    this.setState({
      inputTags:[]
    })
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
    getSearch();
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
      <div class="nav navbar-default offset-by-one three columns gray">
        <div class="container-fluid white-background small-border large-padding gray-border">
          <p class="margin-none">SEARCH FILTERS</p>

          <form>

            <div class="filter">
              <label>Type</label>
              <Input checked={this.props.checked} onChange={this.typeCheck} name="type" id="people" value="people" type="radio" label="People" defaultChecked/>
              <Input checked={this.props.checked} onChange={this.typeCheck} name="type" id="companies" value="companies" type="radio" label="Company"/>
            </div>

            <div class="filter">
              <label>Keywords</label>
              <Input name="keyword" id="keywords" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {tags.keyword}
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

            <Input type='select' name="company_size" label="Size of Company" onChange={this.handleSelected} multiple>
              <option value="0-10">{less_than}10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="501-1000">501-1,000</option>
              <option value="1001-5000">1,001-5,000</option>
              <option value="5001-10000">5,001-10,000</option>
              <option value="10001">10,000+</option>
            </Input>

            <Input type='select' name="revenue" label="Revenue" onChange={this.handleSelected} multiple>
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

            <Input type='select' name="funding" label="Funding" onChange={this.handleSelected} multiple>
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

            <Input type='select' name="person_age" label="Person's Age" onChange={this.handleSelected} multiple>
              <option value="18-22">18-22</option>
              <option value="23-30">23-30</option>
              <option value="31-35">31-35</option>
              <option value="46-60">46-60</option>
              <option value="61">60+</option>
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
              <Input checked={this.props.checked} onChange={this.socialCheck} name='personal_facebook' type='checkbox' value="0" label='Facebook' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='personal_linkedin' type='checkbox' value="1" label='Linkedin' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='personal_twitter' type='checkbox' value="2" label='Twitter' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='personal_github' type='checkbox' value="3" label='Github' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='personal_pinterest' type='checkbox' value="4" label='Pinterest' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='personal_instagram' type='checkbox' value="5" label='Instagram' />
              <Input checked={this.props.checked} onChange={this.socialCheck} name='personal_wikipedia' type='checkbox' value="6" label='Wikipedia' />
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
