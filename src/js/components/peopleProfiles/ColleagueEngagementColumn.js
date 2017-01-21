import React, { PropTypes } from "react"
import { CubeGrid } from "better-react-spinkit"

import ColleagueInfo from "./ColleagueInfo"
import EngagementInfo from "./EngagementInfo"


const ColleagueEngagementColumn = ({ data, colleagues, user }) => {

  return (
    <div class="three columns noShow">
      <ColleagueInfo data={colleagues} user={user}/>

      {
        data ? <EngagementInfo data={data}/> : user ?
          <div className="profile-card engagement">
            <CubeGrid className='flex-center' size={50} color="#36b7ea"/>
          </div> : ''
      }

    </div>
  )
};

ColleagueEngagementColumn.propTypes = {
  data: PropTypes.any
};


export default ColleagueEngagementColumn;
