import React, { Component, PropTypes } from "react";
import { CubeGrid } from "better-react-spinkit"
import Helmet from "react-helmet";
import cookie from "react-cookie";

import ContactLocationColumn      from "../components/peopleProfiles/ContactLocationColumn";
import ColleagueEngagementColumn  from "../components/peopleProfiles/ColleagueEngagementColumn";
import PublicBio from "../components/peopleProfiles/PublicBio";

import CompanyLocationColumn from "../components/companyProfiles/CompanyLocationColumn";
import CompanyInfo from "../components/companyProfiles/CompanyInfo";
import CompanyBio from "../components/companyProfiles/CompanyBio";

const Meta = ({name}) => <Helmet
  meta={[
    {name: "description", content: `${name} Email Address - *****@***.com, ****@***.com | Show email & phone >>>`},
    {name: "keywords", content: `${name} Email Address, ${name}'s Phone Number, email search, email lookup, email address lookup`},
  ]}
/>;

class Profile extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: false,
      engagement: false,
      user: 0
    }
  }

  componentWillMount() {
    const { type, id } = this.props.params;
    const { http } = this.context;

    http.get(`${type}/${id}`).then(response => {this.setState({data: response.data});});

    if(cookie.load('token')) {
      http.get(`ids_connected_to_user`).then(response => this.setState({
        user: Object.keys(response.data).length ? 2 : 1}
      ));
    }

    if(type === 'person' && cookie.load('token')) {
      http.get(`/${type}-engagement/${id}`).then(response => {this.setState({engagement: response.data.results})})
    }
  }

  render() {
    const { data, engagement, user } = this.state;
    const { type } = this.props.params;

    return (
      <div class="gray-light-background">
        <div class="sixteen columns">

          {data ?
            type === 'person' ?
              <div>
                <Meta name={data.name} />
                <ContactLocationColumn data={data} user={user} />
                <PublicBio data={data} user={user} />
                <ColleagueEngagementColumn colleagues={data.colleagues} user={user} data={engagement}/>
              </div>
              :
              <div>
                <Meta name={data.name} />
                <CompanyLocationColumn data={data} user={user} />
                <CompanyBio data={data} user={user} />
                <div className="three columns noShow"><CompanyInfo data={data} user={user}/></div>
              </div>
            :
            <div className="spinner-profile"><CubeGrid size={50} color="#36b7ea"/></div>
          }
        </div>
      </div>
    );
  }
}


Profile.contextTypes = {
  http: PropTypes.func.isRequired
};


export default Profile;
