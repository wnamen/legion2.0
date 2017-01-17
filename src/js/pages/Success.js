import React            from "react";
import { CubeGrid }     from "better-react-spinkit";
import cookie           from "react-cookie";
import $                from "jquery";

export default class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load("token"),
    }
  }

  componentWillMount = () => {
    let tokenHeader = `Token ${this.state.token}`;
    let code = this.props.location.query.code;
    let currentPath = this.props.location.pathname;
    let codeBody;

    if (currentPath.search("google") === -1) {
      codeBody = {outlook_code: code};
    } else if (currentPath.search("outlook" === -1)) {
      codeBody = {google_code: code};
    }

    $.post({
      url: "https://legionv2-api.us-west-2.elasticbeanstalk.com/authenticate",
      headers: {"Authorization": tokenHeader },
      data: codeBody,
      success: (response) => {
        location.reload();
        this.context.router.push('/settings');
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  render() {
    const styles = {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
    return (
      <div style={styles}>
        <CubeGrid size={50} color="#36b7ea" />
      </div>
    );
  }
}

Success.contextTypes = {
  router: React.PropTypes.object
};
