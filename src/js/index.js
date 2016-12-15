import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, browserHistory } from "react-router"
import $ from "jquery"

import Contacts from "./pages/Contacts"
import Layout from "./pages/Layout"
import Landing from "./pages/Landing"
import Search from "./pages/Search"
import Cadence from "./pages/Cadence"
import Stats from "./pages/Stats"

import store from "./store"

const App = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Landing}></IndexRoute>
        <Route path="/search" name="search" component={Search}></Route>
        <Route path="/contacts" name="contacts" component={Contacts}></Route>
        <Route path="/cadence" name="cadence" component={Cadence}></Route>
        <Route path="/stats" name="stats" component={Stats}></Route>
      </Route>
    </Router>
  </Provider>, App
);
