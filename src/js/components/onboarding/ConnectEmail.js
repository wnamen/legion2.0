import React, { Component } from "react";

const ConnectEmail = () => {
  
    const outlookLink = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?scope=openid+offline_access+https%3A%2F%2Foutlook.office.com%2Fmail.readwrite+https%3A%2F%2Foutlook.office.com%2Fmail.send+https%3A%2F%2Foutlook.office.com%2Fcontacts.readwrite+https%3A%2F%2Foutlook.office.com%2Fcalendars.readwrite&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foutlook%2Fsuccess%2F&response_type=code&client_id=ea6cfa32-1e89-404d-b914-3f6d57d8e869";
    const gmailLink = "https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=994895035422-bes5cqbhmf140j906598j1q91pvcnn08.apps.googleusercontent.com&response_type=code&scope=https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify email profile&redirect_uri=http://localhost:8000/google/success&approval_prompt=force"

    return(
      <div>
          <img class="modalIcon smallerIcon" src="/src/img/emailIcon.png"></img>
          <h1 class="modalTitle gray onbTitle">Connect Your Email Account</h1>
          <div id="billingModalForm" >
            <a class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn" href={gmailLink} >Gmail</a>
            <a class="lgnBtn settingsBtn lgnBtnLg smoothBkgd electric-blue-background white inline-block signupBtn" href={outlookLink} >Outlook</a>
          </div>
        </div>
  )
}

export default ConnectEmail