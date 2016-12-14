import React from "react"
import { IndexLink, Link } from "react-router"
import CSSModules from 'react-css-modules'
// import Styles from "./nav.css"

export default class Nav extends React.Component {
  render() {
    const { location } = this.props;

    return (
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <IndexLink to="/" class="navbar-brand"><strong>Legion</strong> Analytics</IndexLink>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li class="active"><Link to="search">Search <span class="sr-only">(current)</span></Link></li>
                <li ><Link to="contacts">Contacts</Link></li>
              </ul>

              <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">12,450 credits <span class="caret"></span><span id="buy-more">Buy More</span></a>
                  <ul class="dropdown-menu">
                    <li><a href="#">50 Credits - $50</a><button class="btn btn-primary">Buy</button></li>
                    <li><a href="#">100 Credits - $90</a><button class="btn btn-primary">Buy</button></li>
                    <li><a href="#">200 Credits - $170</a><button class="btn btn-primary">Buy</button></li>
                    <li><a href="#">500 Credits - $400</a><button class="btn btn-primary">Buy</button></li>
                  </ul>
                </li>
                <li>
                  <a class="navbar-brand" href="#">
                    IMG HOLDER
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}

// <li><Link to="stats">Stats</Link></li>
// <li><Link to="cadence">Cadence</Link></li>
// <li><Link to="contacts">My Contacts</Link></li>
