import React                                           from "react";
import ReactDOM                                        from "react-dom";
import { Router, Route, IndexRoute, browserHistory }   from "react-router";
import cookie                                          from "react-cookie";
import $                                               from "jquery";
import HttpProvider                                    from "./httpProvider";

import Contacts                                        from "./pages/Contacts";
import Layout                                          from "./pages/Layout";
import Landing                                         from "./pages/Landing";
import Search                                          from "./pages/Search";
import Cadence                                         from "./pages/Cadence";
import Settings                                        from "./pages/Settings";
import Onboarding                                      from "./pages/Onboarding";
import TOS                                             from "./pages/TOS";
import Directory                                       from "./pages/Directory";
import ServerError                                     from "./pages/ServerError";
import NotFound                                        from "./pages/NotFound";
import IntegrationSuccess                              from "./pages/IntegrationSuccess";
import Profile                                         from "./pages/Profile";


const App = document.getElementById('app');

let loggedIn = false;

const updateLogin = (status) => loggedIn = status;

(() => {
  let token = cookie.load("token");

  if (token !== undefined) {
    let tokenHeader = `Token ${token}`;
    $.get({
      url: "https://api.legionanalytics.com/me",
      dataType: "JSON",
      crossDomain: true,
      headers: {"Authorization": tokenHeader },
      success: (response) => {
        updateLogin(true);
      },
      error: (response) => {
        console.log(response);
        cookie.remove("token", { path: "/" });
        updateLogin(false);
      }
    })
  }
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
};

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
};

ReactDOM.render(
  <HttpProvider>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Landing} onEnter={guestsOnly} />
        <Route path="search" name="search" component={Search} onEnter={requireAuth} />
        <Route path="contacts" name="contacts" component={Contacts} onEnter={requireAuth} />
        <Route path="campaigns" name="cadence" component={Cadence} onEnter={requireAuth} />

        <Route path="profiles" name="profiles" component={Profile} >
          <Route path=":type/:id" name="type" component={Profile} />
        </Route>

        <Route path="settings" name="settings" component={Settings} onEnter={requireAuth} />
        <Route path="onboarding" name="onboarding" component={Onboarding} />
        <Route path="tos" name="tos" component={TOS} />
  
        <Route path="directory" name="directory" component={Directory} >
          <Route path=":type/:id" name="directory" component={Directory} >
          </Route>
        </Route>
        
        <Route path="google/success" name="success" component={IntegrationSuccess} />
        <Route path="outlook/success" name="success" component={IntegrationSuccess} />
        <Route path="500" name="serverError" component={ServerError} />
        <Route path="*" name="notFound" component={NotFound} />
      </Route>
    </Router>
  </HttpProvider>, App
);
