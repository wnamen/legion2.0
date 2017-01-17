import React                                        from "react";
import ReactDOM                                     from "react-dom";
import { Router, Route, IndexRoute, browserHistory }   from "react-router";
import cookie                                       from "react-cookie";
import $                                            from "jquery";

import Contacts                                     from "./pages/Contacts";
import Layout                                       from "./pages/Layout";
import Landing                                      from "./pages/Landing";
import Search                                       from "./pages/Search";
import Cadence                                      from "./pages/Cadence";
import PeopleProfiles                               from "./pages/PeopleProfiles";
import CompanyProfiles                              from "./pages/CompanyProfiles";
import Settings                                     from "./pages/Settings";
import Onboarding                                   from "./pages/Onboarding";
import TOS                                          from "./pages/TOS";
import Directory                                    from "./pages/Directory";
import ServerError                                  from "./pages/ServerError";
import NotFound                                     from "./pages/NotFound";

import Outlook                                      from "./pages/Outlook";
import Google                                       from "./pages/Google";
import Success                                      from "./pages/Success";

const App = document.getElementById('app');

let loggedIn = false;

const updateLogin = (status) => {
  if (status) {
    return loggedIn = true;
  }
  return loggedIn = false;
}

(() => {
  let token = cookie.load("token");

  if (token !== undefined) {
    let tokenHeader = `Token ${token}`;
    $.get({
      url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/me",
      dataType: "JSON",
      crossDomain:true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        console.log(response);
        updateLogin(true);
      },
      error: (response) => {
        console.log(response);
        cookie.remove("token", { path: "/" })
        updateLogin(false);
      }
    })
  };
})();

const requireAuth = (nextState, replace, cb) => {
  setTimeout(()=> {
    if (!loggedIn) {
      replace({
        pathname: '/'
      })
    }
    return cb();
  }
  , 700);
}

const guestsOnly = (nextState, replace, cb) => {
  setTimeout(()=> {
    if (loggedIn) {
      replace({
        pathname: '/search'
      })
    }
    return cb();
  }
  , 700);
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Landing} onEnter={guestsOnly}></IndexRoute>
      <Route path="/search" name="search" component={Search} onEnter={requireAuth}></Route>
      <Route path="/contacts" name="contacts" component={Contacts} onEnter={requireAuth}></Route>
      <Route path="/campaigns" name="cadence" component={Cadence} onEnter={requireAuth}></Route>
      <Route path="/people-profiles" name="peopleProfiles" component={PeopleProfiles}></Route>
      <Route path="/company-profiles" name="companyProfiles" component={CompanyProfiles}></Route>
      <Route path="/settings" name="settings" component={Settings} onEnter={requireAuth}></Route>
      <Route path="/onboarding" name="onboarding" component={Onboarding} onEnter={requireAuth}></Route>
      <Route path="/tos" name="tos" component={TOS}></Route>
      <Route path="/directory" name="directory" component={Directory}></Route>
      <Route path="/google" name="success" component={Google}>
        <Route path="/google/:status" name="success" component={Success} />
      </Route>
      <Route path="/outlook" name="success" component={Outlook}>
        <Route path="/outlook/:status" name="success" component={Success} />
      </Route>
      <Route path="/500" name="serverError" component={ServerError} />
      <Route path="*" name="notFound" component={NotFound} />
    </Route>
  </Router>, App
);
