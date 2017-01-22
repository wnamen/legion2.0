import React, { Component, PropTypes } from "react"
import cookie from "react-cookie";


class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = (e) => {
    e.preventDefault();
    cookie.remove("token", { path: '/' });
    location.reload();
  };

  render(){
    return(
      <div class="sixteen columns lgbufferMargin">
        <a class="active" onClick={this.logout}>Logout</a>
      </div>
    )
  }
}

Logout.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Logout;
