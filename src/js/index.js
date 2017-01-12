import React                                        from "react";
import ReactDOM                                     from "react-dom";
import { Router, Route, IndexRoute, hashHistory }   from "react-router";
import cookie                                       from "react-cookie";
import $                                            from "jquery";

import Contacts                                     from "./pages/Contacts";
import Layout                                       from "./pages/Layout";
import Landing                                      from "./pages/Landing";
import Search                                       from "./pages/Search";
import Cadence                                      from "./pages/Cadence";
import Profile                                      from "./pages/Profile";
import Settings                                     from "./pages/Settings";
import Onboarding                                   from "./pages/Onboarding";
import TOS                                          from "./pages/TOS";
import Directory                                    from "./pages/Directory";


const App = document.getElementById('app');
const token = cookie.load("token");

const loginCheck = () => {
  console.log(token);
  if (token !== undefined) {
    $.ajax({
      type: "GET",
      url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/me",
      dataType: 'jsonp',
      headers: {"Authorization": "Token "+token},
      success: (response) => {
        console.log(response);
      }
    })
    return true;
  };
  return false;
}

const requireAuth = (nextState, replace) => {
  if (!loginCheck()) {
    replace({
      pathname: '/'
    })
  }
}

const guestsOnly = (nextState, replace) => {
  if (loginCheck()) {
    replace({
      pathname: '/search'
    })
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Landing} onEnter={guestsOnly}></IndexRoute>
      <Route path="/search" name="search" component={Search} onEnter={requireAuth}></Route>
      <Route path="/contacts" name="contacts" component={Contacts} onEnter={requireAuth}></Route>
      <Route path="/campaigns" name="cadence" component={Cadence} onEnter={requireAuth}></Route>
      <Route path="/profile" name="profile" component={Profile}></Route>
      <Route path="/settings" name="settings" component={Settings} onEnter={requireAuth}></Route>
      <Route path="/onboarding" name="onboarding" component={Onboarding} onEnter={requireAuth}></Route>
      <Route path="/tos" name="tos" component={TOS}></Route>
      <Route path="/directory" name="directory" component={Directory}></Route>
    </Route>
  </Router>, App
);


// <Route path='*' component={NotFound} />
