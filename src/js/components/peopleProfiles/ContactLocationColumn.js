import React from "react"

import ContactInfo from "./ContactInfo"
import LocationInfo from "./LocationInfo"

const ContantLocationColumn = ({ data, user }) => {
  
  return (
    <div class="four columns offset-by-one-half smScreenWhiteCard">
      <ContactInfo data={data} user={user} />
      <LocationInfo data={data} user={user} />
    </div>
  )
};

ContantLocationColumn.propTypes = {
  data: React.PropTypes.object.isRequired
};


export default ContantLocationColumn;
