import React, { Component, PropTypes }       from "react";
import { CubeGrid }           from "better-react-spinkit"
import Helmet from "react-helmet";

import ContactLocationColumn      from "../components/peopleProfiles/ContactLocationColumn";
import ColleagueEngagementColumn  from "../components/peopleProfiles/ColleagueEngagementColumn";
import PublicBio from "../components/peopleProfiles/PublicBio";

import CompanyLocationColumn from "../components/companyProfiles/CompanyLocationColumn";
import CompanyInfo from "../components/companyProfiles/CompanyInfo";
import CompanyBio from "../components/companyProfiles/CompanyBio";

const Meta = ({name}) => <Helmet
  meta={[
    {name: "description", content: `${name} Email Address - *****@***.com, ****@***.com | Show email & phone >>>`},
    {name: "keywords", content: `${name} Email Address, Kevin Hale's Phone Number, email search, email lookup, email address lookup`},
  ]}
/>;

class Profile extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: false,
      engagement: false,
    }
  }

  componentWillMount() {
    const { type, id } = this.props.params;
    const { http } = this.context;

    http.get(`${type}/${id}`)
      .then(response => {
        this.setState({data: response.data});
        if(type === 'person') {
          http.get(`/${type}-engagement/${id}`)
            .then(response => {
              this.setState({engagement: response.data.results})
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));

  }

  render() {
    const { data, engagement } = this.state;
    const { type } = this.props.params;
    console.log(this.state);

    return (
      <div class="gray-light-background">
        <div class="sixteen columns">

          {data ?
            type === 'person' ?
              <div>
                <Meta name={data.name} />
                <ContactLocationColumn data={data}/>
                <PublicBio data={data}/>
                <ColleagueEngagementColumn colleagues={data.colleagues} data={engagement}/>
              </div>
              :
              <div>
                <Meta name={data.name} />
                <CompanyLocationColumn data={data}/>
                <CompanyBio data={data}/>
                <CompanyInfo data={data}/>
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
