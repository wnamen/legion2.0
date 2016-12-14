import React from "react"
import CSSModules from 'react-css-modules'
// import Styles from "./nav.css"

export default class ContactsBar extends React.Component {
  render(){
    return(
      <div class="sixteen columns">
        <nav class="navbar navbar-default collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-left">
            <li><a>Showing 5,312 results</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Add to List <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">My First List</a></li>
                <li><a href="#">Founder Contacts</a></li>
                <li><a href="#">Ecommerce Tech Stack</a></li>
                <li><a href="#">+ Create new list</a></li>
              </ul>
            </li>
            <li><a href="#">Get Contacts</a></li>
            <li><a href="#">Export CSV</a></li>
          </ul>

        </nav>
      </div>
    )
  }
}
