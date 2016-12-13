import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import $ from "jquery"

import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
// import Cadence from "./pages/Cadence";
// import List from "./pages/List";
// import Stats from "./pages/Stats";

const App = document.getElementById('app')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Landing}></IndexRoute>
      <Route path="search" name="search" component={Search}></Route>
    </Route>
  </Router>,
App);

// <Route path="cadence" name="cadence" component={Cadence}></Route>
// <Route path="landing" name="landing" component={Landing}></Route>
// <Route path="list" name="list" component={List}></Route>
// <Route path="stats" name="stats" component={Stats}></Route>
