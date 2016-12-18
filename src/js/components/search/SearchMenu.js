import React from "react"
import CSSModules from 'react-css-modules'
import { Input, Tag, Chip } from 'react-materialize'

export default class SearchMenu extends React.Component {
  constructor(props){
		super(props);
		this.state = {
			query: ''
		};
		this.getSearch = this.getSearch.bind(this);
	}

	getSearch(e){
		this.setState({query: `${e.target.name}=${e.target.value}`})

		let query = this.state.query.trim();
		if(!query || query == '')
			return

		this.props.onSearchChange({text:query});

		// this.setState({query: ''});
	}

  render(){
    let less_than = '<'
    return(
      <div class="nav navbar-default offset-by-one three columns gray">
        <div class="container-fluid white-background small-border large-padding gray-border">
          <p class="margin-none">SEARCH FILTERS</p>

        <form onChange={this.getSearch}>

          <div class="filter">
            <label>Type</label>
            <Input name="type" id="people" value="people" type="radio" label="People" defaultChecked/>
            <Input name="type" id="company" value="company" type="radio" label="Company"/>
          </div>

          <div class="filter">
            <label>Keywords</label>
            <Input name="keyword" id="keywords" />
            <div id="keywords-container">
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
            <Input name="job_title" id="title"/>
            <div id="job-title-container"></div>
          </div>

          <div class="filter">
            <label>Company Name</label>
            <Input name="company_name" id="company_name" />
            <div id="company-name-container"></div>
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
            <div id="industry-container"></div>
          </div>

          <div class="filter">
            <label>Education</label>
            <Input name="education" id="education"/>
            <div id="education-container"></div>
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
            <div id="interests-container"></div>
          </div>

          <div class="filter">
            <label>Social Profiles</label>
            <Input name='social-profiles' type='checkbox' value='facebook' label='Facebook' />
            <Input name='social-profiles' type='checkbox' value='linkedin' label='Linkedin' />
            <Input name='social-profiles' type='checkbox' value='twitter' label='Twitter' />
            <Input name='social-profiles' type='checkbox' value='github' label='Github' />
            <Input name='social-profiles' type='checkbox' value='pinterest' label='Pinterest' />
            <Input name='social-profiles' type='checkbox' value='instagram' label='Instagram' />
            <Input name='social-profiles' type='checkbox' value='wikipedia' label='Wikipedia' />
          </div>

          <div class="filter">
            <label>Location</label>
            <Input name="location" id="location"/>
            <div id="location-container"></div>
          </div>

        </form>
        </div>
      </div>
    )
  }
}
