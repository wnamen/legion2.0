import React        from "react";
import { Link }     from "react-router";

export default class ServerError extends React.Component {

  render() {
    return (
      <div class="ten offset-by-three white-background onboardingCard">
			<div class="sixteen columns">
				<div class="nine columns onbMargin text-center">
					<img class="modalIcon" src="/src/img/500error.png"></img>
					<h1 class="modalTitle electric-blue onbTitle"><strong class="largeText">Server Error</strong></h1>
					<h1 class="modalTitle electric-blue onbTitle">We're sorry you're experiencing this, <br></br> our developers have been notified.</h1>
				  	<a href="#" class="active">Take me home!</a>
				</div>
			</div>
		</div>
    );
  }
}
