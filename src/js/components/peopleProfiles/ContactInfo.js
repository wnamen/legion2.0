import React, { PropTypes } from "react";
import { Modal } from "react-materialize";
import classNames from "classnames";
import SignUpModal from "../modals/SignUpModal";

const ContactInfo = ({ data: { name, jobs, location }, user }) => {
  
  const modalTrigger =
    <div class="lgnBtn electric-blue-light-background electric-blue-border black lgnBtnUp">
      Get Kevin's Email
    </div>;
  
  return (
    <div class="profile-card whiteCard" id="contact-card">
      
      <h1 class="adjustedH1">{name}</h1>
      
      <p class="gray meta"><span className="capitalize">{jobs[0].title}</span>{` at ${jobs[0].company_name}`}</p>
      
      <h6 class="gray meta local">{location}</h6>
      
      <div className={classNames({ hidden: user })} >
        <Modal trigger={modalTrigger}>
          <SignUpModal />
        </Modal>
      
        <hr />
      
        <div class="thumbs">
          <i class="fa fa-thumbs-up thumb-icon electric-blue"/>
          <i class="fa fa-thumbs-o-down thumb-icon"/>
        </div>
      </div>
    
    </div>
  )
}


ContactInfo.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    jobs: PropTypes.array
  })
};


export default ContactInfo;