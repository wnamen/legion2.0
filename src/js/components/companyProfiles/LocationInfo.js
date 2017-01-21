import React, { PropTypes } from "react"

const locationList = [
  'amsterdam', 'austin', 'barcelona', 'berlin',
  'capetown', 'dublin', 'london', 'newyork', 'london',
  'paris', 'sanfrancisco', 'stockholm', 'sydney',
  'tokyo', 'wellington'
];


const LocationInfo = ({ data: { location, name } }) => {
  
  const prepareLocation = location.replace(/[\. ,:-]+/g, "").toLowerCase();
  const img = locationList.filter(v => !prepareLocation.search(v))[0];
  
  return (
    <div class="profile-card whiteCard text-center">
      <img src={`/src/img/svg/${img || 'austin'}.svg`} class="electric-blue smScreenImg" alt={`${name} in ${location}`}/>
      <h6 class="gray locationH1">Location:<br /> { location } </h6>
    </div>
  )
};

LocationInfo.propTypes = {
  data: PropTypes.shape({
    location: PropTypes.string
  })
};


export default LocationInfo