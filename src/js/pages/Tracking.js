import React            from "react";
import { CubeGrid }     from "better-react-spinkit";
import cookie           from "react-cookie";
import $                from "jquery";

export default class Tracking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load("token"),
    }
  }

  // componentWillMount = () => {
  //   let tokenHeader = `Token ${this.state.token}`;
  //   let code = this.props.location.query.code;
  //   let currentPath = this.props.location.pathname;
  //   let codeBody;
  //   const { router } = this.context;
  //
  //   if (currentPath.search("google") === -1) {
  //     codeBody = {outlook_code: code};
  //   } else if (currentPath.search("outlook" === -1)) {
  //     codeBody = {google_code: code};
  //   }
  //
  //   $.post({
  //     url: "https://api.legionanalytics.com/authenticate",
  //     headers: {"Authorization": tokenHeader },
  //     data: codeBody,
  //     success: (response) => {
  //       router.push('/settings');
  //     },
  //     error: (response) => {
  //       console.log(response);
  //     }
  //   })
  // }

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

Tracking.contextTypes = {
  router: React.PropTypes.object
};
