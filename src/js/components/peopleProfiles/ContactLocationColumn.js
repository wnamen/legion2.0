import React from "react"

import ContactInfo from "./ContactInfo"
import LocationInfo from "./LocationInfo"

const ContantLocationColumn = ({ data }) => {
  
  return (
    <div class="four columns offset-by-one-half smScreenWhiteCard">
      <ContactInfo data={data}/>
      <LocationInfo data={data}/>
    </div>
  )
};

ContantLocationColumn.propTypes = {
  data: React.PropTypes.object.isRequired
};


export default ContantLocationColumn;
