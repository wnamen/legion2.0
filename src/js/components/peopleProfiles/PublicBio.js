import React, { PropTypes, createElement } from "react";
import { Modal } from "react-materialize";
import classNames from "classnames";

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
}, user }) => {
  
  const modalTrigger1 = <div class="lgnBtn lgnBtn-lg white electric-blue-background">Create my account</div>;
  const modalTrigger2 = <div class="lgnBtn lgnBtn-lg white electric-blue-background text-center">Create my account</div>;
  
  return (
    <div class="eight columns smScreenWhiteCard smScreenMarginLeft">
      
      <div class={classNames('profile-card whiteCard noaccount text-center', { hidden: user })} >
        <h2>Get $100 in credits when you create an account</h2>
        <Modal trigger={modalTrigger1}>
          <SignUpModal />
        </Modal>
      </div>
      
      <div class="profile-card whiteCard">
        <h1 class="gray">{jobs[0].email || '*****@**********.***'}</h1>
        <h1 class="gray">{jobs[0].phone || '(***) ***-****'}</h1> <br />

        <h6 class="black">JOB TITLE</h6>
        <p class="profile-body gray thick-line-height"><span className="capitalize">{jobs[0].title}</span>{` at ${jobs[0].company_name}`}</p> <br />
        
        <h6 class="black">AGE</h6>
        <p class="profile-body gray thick-line-height">{age} years old</p> <br />
  
        
        <h6 class="black">INTERESTS</h6>
        <div class="profile-body gray thick-line-height">
          {interest ? interest.map((v, k) => <div key={k} class="tag gray">{v}</div>) : ''}
        </div>
        <br />
  
        
        <h6 class="black">PUBLIC PROFILES</h6>
        
        {function () {

          const a = (data, link) => createElement('a', {
            href: `${link}/${data}`,
            className: 'active',
            target: '_blank',
          }, data);
          
          const span = () => createElement('span', {
            className: 'active splink gray',
          }, "********");
          
          return <div class="profile-body gray thick-line-height">
            <span className="splink"> Twitter: {personal_twitter ? a(personal_twitter, 'https://twitter.com') : span()} </span>
            <span className="splink"> Linkedin: {personal_linkedin ? a(personal_linkedin, 'https://www.linkedin.com/in') : span()} </span>
            <span className="splink"> Github: {personal_github ? a(personal_github, 'https://github.com') : span()} </span>
            <span className="splink"> Personal Page: {personal_home_page ? a(personal_home_page, 'http://') : span()} </span>
            <span className="splink"> CrunchBase: {personal_crunchbase ? a(personal_crunchbase, 'https://www.crunchbase.com/person/') : span()} </span>
            <span className="splink"> AngelList: {personal_angellist ? a(personal_angellist, 'https://angel.co') : span()} </span>
          </div>
          
        }()}
  
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
        
        <div className={classNames({ hidden: user })}>
          <Modal trigger={modalTrigger2}>
            <SignUpModal />
          </Modal>
        </div>
      
      </div>
    </div>
  )
};


PublicBio.propTypes = {
  data: PropTypes.object.isRequired
};


export default PublicBio;
