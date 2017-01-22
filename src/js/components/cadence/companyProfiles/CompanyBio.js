import React, { Component } from "react";
import { Modal } from "react-materialize";
import $ from "jquery";

// IMPORT OTHER COMPONENTS AND DEPENDENCIES HERE
import SignUpModal from "../modals/SignUpModal";

export default class CompanyBio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // COMPONENT STATE DECLARTION HERE
    }
  }

  //LOGIC HERE: CHECK OUT COMPONENT MOUNTING IF YOU WANT TO TRY IT OUT


  render(){
    //RENDER LOGIC HERE
    const modalTrigger1 = <div class="lgnBtn lgnBtn-lg white electric-blue-background">Create my account</div>;
    const modalTrigger2 = <div class="lgnBtn lgnBtn-lg white electric-blue-background text-center">Create my account</div>;

    return(
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
          <br></br>
          <h6 class="black">Company Size</h6>
          <p class="profile-body gray thick-line-height">11-50 employees</p>
          <br></br>
          <h6 class="black">Revenue</h6>
          <p class="profile-body gray thick-line-height">$1,500,000-$5,000,000</p>
          <br></br>
          <h6 class="black">Funding</h6>
          <p class="profile-body gray thick-line-height">$300,000,000</p>
          <br></br>
          <h6 class="black">Technologies used at Y Combinator</h6>
          <p class="profile-body gray thick-line-height">
            <div class="tag gray">Google Analytics</div>
            <div class="tag gray">Algolia</div>
            <div class="tag gray">Segment</div>
            <div class="tag gray">Wufoo</div>
            <div class="tag gray">Stripe</div>
            <div class="tag gray">Clerky</div>
            <div class="tag gray">Python</div>
            <div class="tag gray">React</div>
          </p>
          <br></br>
          <h6 class="black">PUBLIC PROFILES</h6>
          <p class="profile-body gray thick-line-height">
            <a href="#" class="active splink">Twitter</a>
            <a href="#" class="active splink">Linkedin</a>
            <a href="#" class="inactive gray splink">Github</a>
            <a href="#" class="active splink">Facebook</a>
            <a href="#" class="inactive gray splink">Instagram</a>
            <a href="#" class="inactive gray splink">Pinterest</a>
            <a href="#" class="active splink">Wikipedia</a>
          </p>
          <br></br>
          <h6 class="black">INDUSTRIES</h6>
          <p class="profile-body gray thick-line-height">
            <div class="tag gray">Start Ups</div>
            <div class="tag gray">Design</div>
            <div class="tag gray">Venture Capital</div>
            <div class="tag gray">Angel Investing</div>
            <div class="tag gray">Marketing/Advertising</div>
          </p>
          <br></br>
          <h6 class="black">PUBLIC BIO</h6>
          <p class="profile-body gray thick-line-height">Managing Partner at Y Combinator. I run the Fellowship. Founded Wufoo. Find my dream journal over @dreamface. And yes, I like vests. Holla.</p>
          <p class="profile-body gray thick-line-height"> Kevin Hale is a partner at Y Combinator, which provides seed funding to startups. He works with their portfolio of companies on user experience design, product development and customer support. In 2006,he co-founded Wufoo, which was one of the earliest Y Combinator funded startups. The online form builder was ranked by Jakob Nielson as one of the best application UIs of 2008 and later acquired by SurveyMonkey in 2011.</p>
          <br></br>
          <Modal trigger={modalTrigger2}>
            <SignUpModal />
          </Modal>
        </div>
      </div>
    )
  }
}