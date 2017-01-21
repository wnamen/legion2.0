import React, { PropTypes } from "react"
import { Link } from "react-router"


const ColleagueInfo = ({ data }) => {
  
  return (
    <div>
      <div class="profile-card whiteCard" id="kylieCard">
        <a href="https://www.kylie.ai" target="_blank">
          <img src="/src/img/kylieAd.png" class="kylieAd" />
        </a>
      </div>
      
      <div class="profile-card colleagues">
        <h6 class="black">Colleagues</h6>
        {data.map((v, k) => <Link key={k} to={`/profile/person/${v.person__id}`} class="active" >{v.person__name}</Link>)}
      </div>
    </div>
  )
};


ColleagueInfo.propTypes = {
  data: PropTypes.any
};


export default ColleagueInfo;

