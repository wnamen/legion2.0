import React from "react";

export default class Nav extends React.Component {
  render() {
    return (
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#"><strong>Legion</strong> Analytics</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li class="active"><a href="#">Search <span class="sr-only">(current)</span></a></li>
                <li><a href="#">Stats</a></li>
                <li><a href="#">Cadence</a></li>
                <li><a href="#">My Contacts</a></li>
              </ul>

              <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="#">50 Credits - $50</a></li>
                    <li><a href="#">100 Credits - $90</a></li>
                    <li><a href="#">200 Credits - $170</a></li>
                    <li><a href="#">500 Credits - $400</a></li>
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
