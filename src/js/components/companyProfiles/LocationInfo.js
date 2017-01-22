import React, { PropTypes } from "react"

const locationList = [
  'amsterdam', 'austin', 'barcelona', 'berlin',
  'capetown', 'dublin', 'london', 'newyork', 'london',
  'paris', 'sanfrancisco', 'stockholm', 'sydney',
  'tokyo', 'wellington'
];

const LocationInfo = ({ data: { name, location } }) => {
  
  const prepareLocation = location ? location.replace(/[\. ,:-]+/g, "").toLowerCase() : null;
  const img = location ? locationList.filter(v => !prepareLocation.search(v))[0] : null;
  
  return (
    <div class="profile-card whiteCard text-center" >
      <img src={`/src/img/svg/${ img || 'austin' }.svg`} class="electric-blue smScreenImg" alt={`${ name } in ${ location }`}/>
      <h6 class="gray locationH1"> Location{ location ? ':' : '' } <br /> { location } </h6>
    </div>
  )
};

LocationInfo.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string
  })
};


export default LocationInfo;
