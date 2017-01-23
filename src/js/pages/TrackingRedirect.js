import React            from "react";
import { CubeGrid }     from "better-react-spinkit";
import cookie           from "react-cookie";
import $                from "jquery";

export default class TrackingRedirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load("token"),
    }
  }

  render() {
    const styles = {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }

    return (
      <div class="ten offset-by-three white-background">
        <div class="sixteen columns">
          <div style={styles}>
            <CubeGrid size={50} color="#36b7ea" />
          </div>
        </div>
      </div>
    );
  }
}

TrackingRedirect.contextTypes = {
  router: React.PropTypes.object
};
