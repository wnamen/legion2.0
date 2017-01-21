import React, { PropTypes } from "react"

const EngagementInfo = ({ data }) => {
  
  return (
    <div class="profile-card engagement">
      <h6 class="black">Engagement</h6>
      
      {
        data.map(v => {
            const date = v.date;
            return (
              <div key={v.id}>
                <div class="activityAction">
                  <div class={`actionIcon ${v.type_of_visit === 'open' ? `red-background` : -`electric-blue-background`}`}/>
                  <p class="activityDetails gray">
                    {v.type_of_visit === 'open' ? '- Opened' : '- Clicked' }
                    <strong>{v.subject}</strong> on <strong>{date}</strong>
                  </p>
                </div>
                <br />
              </div>
            )
          }
        )
      }
    
    </div>
  )
};


EngagementInfo.propTypes = {
  data: PropTypes.any
};

export default EngagementInfo;
