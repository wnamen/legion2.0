import React, { Component, PropTypes }       from "react";
import { CubeGrid }           from "better-react-spinkit"
import Helmet from "react-helmet";

import ContactLocationColumn      from "../components/peopleProfiles/ContactLocationColumn";
import ColleagueEngagementColumn  from "../components/peopleProfiles/ColleagueEngagementColumn";
import PublicBio from "../components/peopleProfiles/PublicBio";

import CompanyLocationColumn from "../components/companyProfiles/CompanyLocationColumn";
import CompanyInfo from "../components/companyProfiles/CompanyInfo";
import CompanyBio from "../components/companyProfiles/CompanyBio";


{/*<meta property="og:title" content="Legion Analytics - Lookup email & phone for millions of professionals">*/}
{/*<meta property="og:type" content="website">*/}
{/*<meta property="og:Description" content="Legion Analytics - Lookup email & phone for millions of professionals across millions of companies.">*/}
{/*<meta property="og:image" content="//legionanalytics.com/src/img/legion_analytics_logo.png">*/}
{/*<meta property="og:image:secure_url" content="//legionanalytics.com/src/img/legion_analytics_logo.png">*/}
{/*<meta property="og:image:type" content="image/png">*/}
{/*<meta property="og:image:width" content="500">*/}
{/*<meta property="og:image:height" content="500">*/}

{/*<meta name="twitter:card" content="summary_large_image">*/}
{/*<meta name="twitter:site" content="@legionanalytics">*/}
{/*<meta name="twitter:creator" content="@legionanalytics">*/}
{/*<meta name="twitter:title" content="Legion Analytics - Lookup Email & Phone for millions of professionals">*/}
{/*<meta name="twitter:description" content="Email lookups by name, location, job or profile keywords for millions of professionals. Use our email search to get contact information on your desktop.">*/}
{/*<meta name="twitter:image" content="//legionanalytics.com/src/img/legion_analytics_logo.png">*/}

const Meta = ({description, keywords, }) => <Helmet
  meta={[
    {name: "description", content: {description}},
    {name: "keywords", content: {keywords}},
    {name: "property", content: {keywords}},
    {name: "property", content: {keywords}},
    {name: "property", content: {keywords}},
  ]}
  onChangeClientState={(newState) => newState}
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
                <Meta name={data.name} description={"123123"} keyword={"123123"} />
                <ContactLocationColumn data={data}/>
                <PublicBio data={data}/>
                <ColleagueEngagementColumn colleagues={data.colleagues} data={engagement}/>
              </div>
              :
              <div>
                <Meta/>
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
