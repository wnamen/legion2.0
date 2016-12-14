import React from "react"
import CSSModules from 'react-css-modules'
// import Styles from "./nav.css"

export default class SearchMenu extends React.Component {
  render(){
    let less_than = '<'
    return(
      <div class="nav navbar-default offset-by-one-half three columns">
        <div class="container-fluid">
          <h5>Search Filters</h5>

        <form>
          <div class="filter form-group">
            <label>Type</label>
            <p class="radio">
              <input type="radio" name="optionsRadios" id="people" value="people" defaultChecked/>
              <label>People</label>
            </p>
            <p class="radio">
              <input type="radio" name="optionsRadios" id="company" value="company"/>
              <label>Company</label>
            </p>
          </div>

          <div class="filter form-group">
            <label>Keywords</label>
            <input type="text" class="form-control"/>
            <div id="keywords"></div>
          </div>

          <div class="filter input-field">
            <label>Department</label>
            <select multiple>
              <option value="" disabled class="selected">Select Multiple</option>
              <option>Customer Support</option>
              <option>C-Suite</option>
              <option>Engineering</option>
              <option>Finance</option>
              <option>Human Resources</option>
              <option>Marketing</option>
              <option>Operations</option>
              <option>Sales</option>
            </select>
          </div>

          <div class="filter form-group">
            <label>Job Title</label>
            <input type="text" class="form-control"/>
            <div id="job-title"></div>
          </div>

          <div class="filter form-group">
            <label>Company Name</label>
            <input type="text" class="form-control"/>
            <div id="company-name"></div>
          </div>

          <div class="dropdown filter form-group">
            <label>Size of Company</label>
            <select placeholder="Select Multiple" class="form-control">
              <option>{less_than}10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201-500</option>
              <option>501-1,000</option>
              <option>1,001-5,000</option>
              <option>5,001-10,000</option>
              <option>10,000+</option>
            </select>
          </div>

          <div class="dropdown filter form-group">
            <label>Revenue</label>
            <select class="form-control">
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
            </select>
          </div>

          <div class="dropdown filter form-group">
            <label>Funding</label>
            <select class="form-control">
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
            </select>
          </div>

          <div class="dropdown filter form-group">
            <label>Technology Stack</label>
            <select class="form-control">
              <option>{less_than} 10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201-500</option>
              <option>501-1,000</option>
              <option>1,001-5,000</option>
              <option>5,001-10,000</option>
              <option>10,000+</option>
            </select>
          </div>

          <div class="dropdown filter form-group">
            <label>Industry</label>
            <select class="form-control">
              <option>{less_than} 10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201-500</option>
              <option>501-1,000</option>
              <option>1,001-5,000</option>
              <option>5,001-10,000</option>
              <option>10,000+</option>
            </select>
          </div>

          <div class="filter form-group">
            <label>Education</label>
            <input type="text" class="form-control"/>
          </div>

          <div class="dropdown filter form-group">
            <label>Persons Age</label>
            <select class="form-control">
              <option>{less_than} 10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201-500</option>
              <option>501-1,000</option>
              <option>1,001-5,000</option>
              <option>5,001-10,000</option>
              <option>10,000+</option>
            </select>
          </div>

          <div class="filter form-group">
            <label>Interests</label>
            <input type="text" class="form-control"/>
            <div id="interests"></div>
          </div>

          <div class="filter form-group">
            <label>Social Profiles</label>
            <input type="text" class="form-control"/>
          </div>

          <div class="filter form-group">
            <label>Location</label>
            <input type="text" class="form-control"/>
            <div id="location"></div>
          </div>

        </form>
        </div>
      </div>
    )
  }
}
