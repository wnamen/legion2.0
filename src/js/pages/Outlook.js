import React            from "react";
import { Link }         from "react-router";
import { CubeGrid }     from "better-react-spinkit";
import $                from "jquery";

export default class Outlook extends React.Component {

  render() {
    return (
    	<div class="ten offset-by-three white-background">
  			<div class="sixteen columns">
          { this.props.children }
  			</div>
  		</div>
    );
  }
}
