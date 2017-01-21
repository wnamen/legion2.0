import React, { PropTypes } from "react";
import { Modal } from "react-materialize";
import classNames from "classnames";

import SignUpModal from "../modals/SignUpModal";


const CompanyInfo = ({ data: { name, location }, user }) => {
  
  const modalTrigger = <div class="lgnBtn electric-blue-light-background electric-blue-border black lgnBtnUp">Find Employees</div>;
  
  return (
    <div class="profile-card whiteCard" id="contact-card">
      <div />
      <h1 class="adjustedH1">{name}</h1>
      <p class="gray meta"><br/></p>
      <h6 class="gray meta local">{location}</h6>
      
      <div className={classNames({ hidden: user })} >
        <Modal trigger={modalTrigger} className={classNames({ hidden: user })}>
          <SignUpModal />
        </Modal>
      </div>
    </div>
  )
};

CompanyInfo.propTypes = {
  data: PropTypes.object.isRequired
};


export default CompanyInfo;
