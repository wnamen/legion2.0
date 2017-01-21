import React, { PropTypes } from "react"

import CompanyInfo from "./CompanyInfo"
import LocationInfo from "./LocationInfo"


const CompanyLocationColumn = ({ data, user }) => {
  
  return (
    <div class="four columns offset-by-one-half smScreenWhiteCard">
      <CompanyInfo data={data} user={user} />
      <LocationInfo data={data} user={user} />
    </div>
  )
};

CompanyLocationColumn.propTypes = {
  data: PropTypes.object.isRequired
};


export default CompanyLocationColumn;
