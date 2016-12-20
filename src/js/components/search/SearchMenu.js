import React from "react"
import CSSModules from 'react-css-modules'
import { Input, Tag, Chip } from 'react-materialize'
import { debounce } from 'throttle-debounce';
import $ from 'jquery'

export default class SearchMenu extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      inputTags: [],
			query: ""
		};
		this.getSearch = this.getSearch.bind(this);
    this.getTag = debounce(750, this.getTag.bind(this));
    this.removeTag = this.removeTag.bind(this);
    this.handleDebouncer = this.handleDebouncer.bind(this);
	}

  removeTag(e) {
    e.preventDefault();
    let current_tags = this.state.inputTags;
    let target_id = parseInt(e.target.id);
    console.log(target_id);


    current_tags.forEach((tag, idx) => {
      if ((tag.id) === target_id) {
        current_tags.splice(idx, 1);
      }
    });
    console.log(current_tags);

    this.setState({inputTags: current_tags});
    this.getSearch(e);
  }

  getTag(e) {
    let new_tags = this.state.inputTags;

    new_tags.push({
      id: new_tags.length > 0 ? new_tags[new_tags.length-1].id + 1 : 1,
      name: e.target.name,
      value: e.target.value
    });
    this.setState({inputTags: new_tags});
    this.getSearch(e);
    e.target.value = "";
  }

  getSearch(e) {
    let query = "";
    this.state.inputTags.forEach((target) => {
      query = query + `${target.name}=${target.value}&`;
    });
    console.log(query);

    // let query = `${e.target.name}=${e.target.value}`.trim();
    this.setState({ query: query });
    this.props.onSearchChange({ text: query });
  }

  handleDebouncer(e) {
    e.persist();
    console.log(e.target.name);
    this.getTag(e);
  }

  render(){
    let less_than = '<';

    let input_tags = this.state.inputTags;
    if (input_tags !== undefined){
      input_tags = input_tags.map((tag) => {
        return (
          <a href="" id={tag.id} class="tags" onClick={this.removeTag} key={tag.id} name={tag.name} value={tag.value}>{tag.value}&nbsp;&nbsp;&nbsp;x</a>
        );
      })
    }
    console.log(input_tags);

    return(
      <div class="nav navbar-default offset-by-one three columns gray">
        <div class="container-fluid white-background small-border large-padding gray-border">
          <p class="margin-none">SEARCH FILTERS</p>

          <form>

            <div class="filter">
              <label>Type</label>
              <Input name="type" id="people" value="people" type="radio" label="People" defaultChecked/>
              <Input name="type" id="company" value="company" type="radio" label="Company"/>
            </div>

            <div class="filter">
              <label>Keywords</label>
              <Input name="keyword" id="keywords" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {input_tags}
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
                {input_tags}
              </div>
            </div>

            <div class="filter">
              <label>Company Name</label>
              <Input name="company_name" id="company_name" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {input_tags}
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

            <Input type='select' label="Funding" multiple>
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

            <Input type='select' label="Technology Stack" multiple>
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
              <label>Industry</label>
              <Input name="industry" id="industry"/>
              <div class="tag-container"></div>
            </div>

            <div class="filter">
              <label>Education</label>
              <Input name="education" id="education" onChange={this.handleDebouncer} />
              <div class="tag-container">
                {input_tags}
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
              <label>Interests</label>
              <Input name="interests" id="interests"/>
              <div class="tag-container">
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
                {input_tags}
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }
}
