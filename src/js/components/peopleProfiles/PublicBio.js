import React, { PropTypes, createElement } from "react";
import { Modal } from "react-materialize";
import ReactDOM from "react-dom";

import SignUpModal from "../modals/SignUpModal";

const PublicBio = ({ data: {
  jobs,
  age,
  twitter_bio,
  linkedin_bio,
  personal_twitter,
  personal_linkedin,
  personal_github,
  personal_home_page,
  personal_crunchbase,
  personal_angellist,
  industries, education, interest
} }) => {
  
  const modalTrigger1 = <div class="lgnBtn lgnBtn-lg white electric-blue-background">Create my account</div>;
  const modalTrigger2 = <div class="lgnBtn lgnBtn-lg white electric-blue-background text-center">Create my
    account</div>;
  
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
        <h1 class="gray">(***) ***-****</h1> <br />
        
        <h6 class="black">JOB TITLE</h6>
        <p class="profile-body gray thick-line-height">{`${jobs[0].title} at ${jobs[0].company_name}`}</p> <br />
        
        <h6 class="black">AGE</h6>
        <p class="profile-body gray thick-line-height">{age} years old</p> <br />
  
        
        <h6 class="black">INTERESTS</h6>
        <div class="profile-body gray thick-line-height">
          {interest ? interest.map((v, k) => <div key={k} class="tag gray">{v}</div>) : ''}
        </div>
        <br />
  
        
        <h6 class="black">PUBLIC PROFILES</h6>
        <div class="profile-body gray thick-line-height">
          <a href={`https://twitter.com/${personal_twitter}`} class={`active splink ${personal_twitter || `gray`}`}>Twitter: {personal_twitter || "*******"}</a>
          <a href={`https://www.linkedin.com/in/${personal_linkedin}`} class={`active splink ${personal_linkedin || `gray`}`}>Linkedin: {personal_linkedin || "*******"}</a>
          <a href={`https://github.com/${personal_github}`} class={`active splink ${personal_github || `gray`}`}>Github: {personal_github || "*******"}</a>
          <a href={`http://${personal_home_page}`} class={`active splink ${personal_home_page || `gray`}`}>Personal: {personal_home_page || "*******"}</a>
          <a href={`${personal_crunchbase} ? 'https://www.crunchbase.com/person/${personal_crunchbase}' : '#'`} class={`active splink ${personal_crunchbase || `gray`}`}>CrunchBase: {personal_crunchbase || "*******"}</a>
          
          <a class={`${personal_angellist || `gray`}`}>{personal_angellist || "*******"}</a>
              
              {function () {

                return <span>AngelList: {createElement('a', {
                  href: `https://angel.co/${personal_angellist}`,
                  className: 'active splink',
                  value: personal_angellist
                }, personal_angellist)} </span>;
                
              }()}
                
          
        </div>
        <br />
        
        <h6 class="black">INDUSTRIES</h6>
        <div class="profile-body gray thick-line-height">
          {industries ? industries.map((v, k) => <div key={k} class="tag gray">{v}</div>) : ''}
        </div>
        <br />
        
        <h6 class="black">EDUCATION</h6>
        <div class="profile-body gray thick-line-height">
          {education ? education.map((v, k) => <div key={k} class="splink edu">{v}</div>) : ''}
        </div>
        <br />
        
        <h6 class="black">PUBLIC BIO</h6>
        <p class="profile-body gray thick-line-height">{twitter_bio}</p>
        <p class="profile-body gray thick-line-height">{linkedin_bio}</p>
        <br />
        
        <Modal trigger={modalTrigger2}>
          <SignUpModal />
        </Modal>
      
      </div>
    </div>
  )
};


PublicBio.propTypes = {
  data: PropTypes.object.isRequired
};


export default PublicBio;
