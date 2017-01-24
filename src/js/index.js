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
import Tracking                                        from "./pages/Tracking";
import Profile                                         from "./pages/Profile";


const App = document.getElementById('app');

let loggedIn = false;
let token = undefined;

const updateLogin = (status) => loggedIn = status;


const setToken = () => {
  token = cookie.load("token");
};

(() => {

  let token = cookie.load("token");
  setToken();
  if (token !== undefined) {

    let tokenHeader = `Token ${token}`;

    $.get({
      url: "https://api.legionanalytics.com/me",
      dataType: "JSON",
      crossDomain: true,
      headers: {"Authorization": tokenHeader },
      success: () => {
        updateLogin(true);
      },
      error: () => {
        cookie.remove("token", { path: "/" });
        updateLogin(false);
      }
    })

  }
})();

const requireAuth = (nextState, replace, cb) => {
  setToken();
  setTimeout(()=> {
    if (!cookie.load("token")) {
      replace({
        pathname: '/'
      })
    }
    return cb();
  }
  , 700);
};

const guestsOnly = (nextState, replace, cb) => {
  setToken();
  setTimeout(()=> {
    if (cookie.load("token")) {
      replace({
        pathname: '/search'
      })
    }
    return cb();
  }
  , 700);
};

ReactDOM.render(
  <HttpProvider token={token}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} >
        <IndexRoute component={Landing} onChange={guestsOnly} />
        <Route path="search" name="search" component={Search} onEnter={requireAuth} />
        <Route path="contacts" name="contacts" component={Contacts} onEnter={requireAuth} />
        <Route path="campaigns" name="cadence" component={Cadence} onEnter={requireAuth} />

        <Route path="profiles" name="profiles" component={Profile} >
          <Route path=":type/:id" name="type" component={Profile} >
          </Route>
        </Route>

        <Route path="settings" name="settings" component={Settings} onEnter={requireAuth} />
        <Route path="onboarding" name="onboarding" component={Onboarding} />
        <Route path="tos" name="tos" component={TOS} />

        <Route path="directory" name="directory" component={Directory} >
          <Route path=":type/:id" name="directory" component={Directory} >
          </Route>
        </Route>

        <Route path="legion/r/:id" name="tracking" component={Tracking} />
        <Route path="legion/e/:id" name="tracking" component={Tracking} />

        <Route path="google/success" name="success" component={IntegrationSuccess} />
        <Route path="outlook/success" name="success" component={IntegrationSuccess} />

        <Route path="500" name="serverError" component={ServerError} />
        <Route path="*" name="notFound" component={NotFound} />
      </Route>
    </Router>
  </HttpProvider>, App
);
