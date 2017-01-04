import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import $ from "jquery"

import Contacts from "./pages/Contacts"
import Layout from "./pages/Layout"
import Landing from "./pages/Landing"
import Search from "./pages/Search"
import Cadence from "./pages/Cadence"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"

const App = document.getElementById('app')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Landing}></IndexRoute>
      <Route path="/search" name="search" component={Search}></Route>
      <Route path="/contacts" name="contacts" component={Contacts}></Route>
      <Route path="/cadence" name="cadence" component={Cadence}></Route>
      <Route path="/profile" name="profile" component={Profile}></Route>
      <Route path="/settings" name="settings" component={Settings}></Route>
    </Route>
  </Router>, App
);
