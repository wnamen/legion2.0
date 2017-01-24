import React, { PropTypes } from "react";
import { Modal } from "react-materialize";
import classNames from "classnames";
import SignUpModal from "../modals/SignUpModal";

const ContactInfo = ({ data: { name, jobs, location }, user }) => {

  const modalTrigger =
    <div class="lgnBtn electric-blue-light-background electric-blue-border black lgnBtnUp">
      {`Get ${name}'s Email`}
    </div>;
  const job = jobs.length ? jobs[0] : null;
  return (
    <div class="profile-card whiteCard" id="contact-card">

      <h1 class="adjustedH1">{name}</h1>
<<<<<<< HEAD

      <p class="gray meta"><span className="capitalize">{job ? job.title : '**********'}</span>{` at ${job ? job.company_name : '**********'}`}</p>

=======
      
      <p class="gray meta"><span className="capitalize">{job ? job.title : 'Unknown'}</span>{` at ${job ? job.company_name : 'Unknown'}`}</p>
      
>>>>>>> 1bd4055b3c6e2e92876ac67b0cb8de21a2534ba4
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
