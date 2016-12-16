import React from "react"
import CSSModules from 'react-css-modules'
import { Input } from 'react-materialize'
// import Styles from "./nav.css"

export default class SearchMenu extends React.Component {
  render(){
    let less_than = '<'
    return(
      <div class="nav navbar-default offset-by-one three columns">
        <div class="container-fluid white-background small-border gray-border">
          <h5>Search Filters</h5>

        <form>

          <div class="filter">
            <label>Type</label>
            <Input name="type" id="people" value="people" type="radio" label="People"/>
            <Input name="type" id="company" value="company" type="radio" label="Company"/>
          </div>

          <div class="filter">
            <Input label="Keywords" />
            <div id="keywords"></div>
          </div>

          <Input type='select' label="Department" multiple>
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
            <Input label="Job Title" />
            <div id="job-title"></div>
          </div>

          <div class="filter">
            <Input label="Company Name" />
            <div id="company-name"></div>
          </div>

          <Input type='select' label="Size of Company" multiple>
            <option>{less_than}10</option>
            <option>11-50</option>
            <option>51-200</option>
            <option>201-500</option>
            <option>501-1,000</option>
            <option>1,001-5,000</option>
            <option>5,001-10,000</option>
            <option>10,000+</option>
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

          <Input type='select' label="Industry" multiple>
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
            <Input label="Education" />
            <div id="education"></div>
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
            <Input label="Interests" />
            <div id="interests"></div>
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
            <Input label="Location" />
            <div id="location"></div>
          </div>

        </form>
        </div>
      </div>
    )
  }
}
