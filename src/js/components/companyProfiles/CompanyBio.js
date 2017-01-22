import React, { PropTypes, createElement } from "react";
import { Modal } from "react-materialize";
import classNames from "classnames";
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
  }, user
}) => {
  
  const modalTrigger1 = <div class="lgnBtn lgnBtn-lg white electric-blue-background">Create my account</div>;
  const modalTrigger2 = <div class="lgnBtn lgnBtn-lg white electric-blue-background text-center">Create my account</div>;
  
  return (
    <div class="eight columns smScreenWhiteCard smScreenMarginLeft">
      
      <div className={classNames("profile-card whiteCard noaccount text-center", { hidden: user })} >
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
        
        <h6 class="black">Technologies used at {name}</h6>
        <div class="profile-body gray thick-line-height">
          {technologies ? technologies.map((v, k) => <div key={k} class="tag gray">{v}</div>) : ''}
        </div> <br />
        
        <h6 class="black">PUBLIC PROFILES</h6>
        {function () {
    
          const a = (data, link) => createElement('a', {
            href: `${link}/${data}`,
            className: 'active',
            target: '_blank',
          }, data);
    
          const span = () => createElement('span', {
            className: 'active gray',
          }, "********");
    
          return <div class="profile-body gray thick-line-height">
            <span className="splink"> Twitter:       {company_twitter      ? a(company_twitter,   'https://twitter.com')          : span()} </span>
            <span className="splink"> Linkedin:      {company_linkedin     ? a(company_linkedin,  'https://www.linkedin.com/in')  : span()} </span>
            <span className="splink"> Facebook:        {company_facebook       ? a(company_facebook,    'https://facebook.com')   : span()} </span>
            <span className="splink"> Personal Page: {company_home_page    ? a(company_home_page, 'http:/')                      : span()} </span>
            <span className="splink"> Pintrest:    {company_pinterest   ? a(company_pinterest, 'http://pintrest.com')             : span()} </span>
            <span className="splink"> AngelList:     {company_angellist    ? a(company_angellist, 'https://angel.co')             : span()} </span>
          </div>
    
        }()}
        <br />
        
        <h6 class="black">INDUSTRIES</h6>
        <div class="profile-body gray thick-line-height">
          {industries ? industries.map((v, k) => <div key={k} class="tag gray">{v}</div>) : ''}
        </div> <br />
        
        <h6 class="black">PUBLIC BIO</h6>
        <p class="profile-body gray thick-line-height">
          {twitter_bio}
        </p>
        <p class="profile-body gray thick-line-height">
          {linkedin_bio}
        </p>
        <br />
        
        <div className={classNames({ hidden: user })} >
          <Modal trigger={modalTrigger2} >
            <SignUpModal />
          </Modal>
        </div>
      </div>
    </div>
  )
}


CompanyBio.propTypes = {
  data: PropTypes.object.isRequired
};


export default CompanyBio;

