import React, { PropTypes } from "react"
import { Link } from "react-router"
import classNames from "classnames";



const ColleagueInfo = ({ data, user }) => {

  return (
    <div>
      <div className={classNames({ hidden: user })}>
        <div class="profile-card whiteCard" id="kylieCard">
          <a href="https://www.kylie.ai" target="_blank">
            <img src="/src/img/kylieAd.png" class="kylieAd" />
          </a>
        </div>
      </div>

      <div class="profile-card colleagues">
        <h6 class="black">Colleagues</h6>
        {data.map((v, k) => <Link key={k} to={`/profiles/person/${v.person__id}`} class="active" >{v.person__name}</Link>)}
      </div>
    </div>
  )
};


ColleagueInfo.propTypes = {
  data: PropTypes.any
};


export default ColleagueInfo;
