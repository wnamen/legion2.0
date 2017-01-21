import React, { PropTypes } from "react"
import { CubeGrid } from "better-react-spinkit"

import ColleagueInfo from "./ColleagueInfo"
import EngagementInfo from "./EngagementInfo"


const ColleagueEngagementColumn = ({ data, colleagues }) => {
  
  return (
    <div class="three columns noShow">
      <ColleagueInfo data={colleagues}/>
      {data ? <EngagementInfo data={data}/> : <div className="engagement-profile"><CubeGrid size={50} color="#36b7ea"/></div> }
    </div>
  )
};

ColleagueEngagementColumn.propTypes = {
  data: PropTypes.any
};


export default ColleagueEngagementColumn;
