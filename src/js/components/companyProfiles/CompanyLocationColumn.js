import React, { PropTypes } from "react"

import CompanyInfo from "./CompanyInfo"
import LocationInfo from "./LocationInfo"


const CompanyLocationColumn = ({ data }) => {
  
  return (
    <div class="four columns offset-by-one-half smScreenWhiteCard">
      <CompanyInfo data={data}/>
      <LocationInfo data={data}/>
    </div>
  )
};

CompanyLocationColumn.propTypes = {
  data: PropTypes.object.isRequired
};


export default CompanyLocationColumn;
