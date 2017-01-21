import React, { PropTypes } from "react";
import { Modal } from "react-materialize";
import SignUpModal from "../modals/SignUpModal";

const CompanyBio = ({
  data: {
    linkedin_bio,
    twitter_bio,
    funding,
    company_angellist,
    company_facebook,
    company_home_page,
    company_linkedin,
    company_pinterest,
    company_twitter,
    industries,
    technologies,
    name,
  }
}) => {
  
  const modalTrigger1 = <div class="lgnBtn lgnBtn-lg white electric-blue-background">Create my account</div>;
  const modalTrigger2 = <div class="lgnBtn lgnBtn-lg white electric-blue-background text-center">Create my account</div>;
  
  return (
    <div class="eight columns smScreenWhiteCard smScreenMarginLeft">
      
      <div class="profile-card whiteCard noaccount text-center">
        <h2>Get $100 in credits when you create an account</h2>
        <Modal trigger={modalTrigger1}>
          <SignUpModal />
        </Modal>
      </div>
      
      <div class="profile-card whiteCard">
        <h1 class="gray">*****@**********.***</h1>
        <h1 class="gray">(***) ***-****</h1>
        <br />
        
        <h6 class="black">Company Size</h6>
        <p class="profile-body gray thick-line-height">11-50 employees</p> <br />
        
        <h6 class="black">Revenue</h6>
        <p class="profile-body gray thick-line-height">$1,500,000-$5,000,000</p> <br />
        
        <h6 class="black">Funding</h6>
        <p class="profile-body gray thick-line-height">${funding}</p> <br />
        
        <h6 class="black">Technologies used at ${name}</h6>
        <div class="profile-body gray thick-line-height">
          {technologies.map(v => <div class="tag gray">{v}</div>)}
        </div> <br />
        
        <h6 class="black">PUBLIC PROFILES</h6>
        <div class="profile-body gray thick-line-height">
          <a href="#" class="active splink">Twitter: {company_twitter || "*******"}</a>
          <a href="#" class="active splink">Linkedin: {company_linkedin || "*******"}</a>
          <a href="#" class="active splink">Facebook: {company_facebook || "*******"}</a>
          <a href="#" class="inactive gray splink">Personal: {company_home_page || "*******"}</a>
          <a href="#" class="active splink">AngelList: {company_angellist || "*******"}</a>
          <a href="#" class="active splink">Pintrest: {company_pinterest || "*******"}</a>
        </div> <br />
        
        <h6 class="black">INDUSTRIES</h6>
        <div class="profile-body gray thick-line-height">
          {industries.map(v => <div class="tag gray">{v}</div>)}
        </div> <br />
        
        <h6 class="black">PUBLIC BIO</h6>
        <p class="profile-body gray thick-line-height">
          {twitter_bio}
        </p>
        <p class="profile-body gray thick-line-height">
          {linkedin_bio}
        </p>
        <br />
        <Modal trigger={modalTrigger2}>
          <SignUpModal />
        </Modal>
      </div>
    </div>
  )
}


CompanyBio.propTypes = {
  data: PropTypes.object.isRequired
};


export default CompanyBio;

