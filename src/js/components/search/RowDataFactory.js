export default class RowDataFactory {

  createRowData(){
    let data = this.props.results;
    let mappedResults;

      if ((data.results !== undefined) && (data.results.length > 0)) {
        mappedResults = data.results.map((result, index) => {
          if (this.props.apiState.people === true) {
            return (
              {
                name: result.person.name,
                jobTitle: result.title,
                education: this.arrayConvert(result.person.education),
                age: result.person.age,
                interests: this.arrayConvert(result.person.interests),
                phone: result.has_phone ? this.state.icons.optionAvailable : "",
                email: result.has_email  ? "<i class='fa fa-check' aria-hidden=true></i>" : "",
                linkedin: result.person.personal_linkedin ? "<i class='fa fa-check' aria-hidden=true></i>" : "",
                facebook: result.person.personal_facebook ? "<i class='fa fa-check' aria-hidden=true></i>" : "",
                twitter: result.person.personal_twitter ? "<i class='fa fa-check' aria-hidden=true></i>" : "",
                crunchbase: result.person.personal_crunchbase ? "<i class='fa fa-check' aria-hidden=true></i>" : "",
                homePage: result.person.personal_homePage ? "<i class='fa fa-check' aria-hidden=true></i>" : "",
                companyName: result.company.name,
                industry: this.arrayConvert(result.company.industries),
                revenue: (result.company.revenue).toLocaleString(),
                funding: (result.company.funding).toLocaleString(),
                companySize: (result.company.number_of_employees).toLocaleString(),
                companyLinkedin: result.company.company_linkedin ? '&#10003;' : "",
                companyTwitter: result.company.company_twitter ? "<i class='fa fa-check' aria-hidden=true></i>" : "",
                companyHomePage: result.company.company_home_page ? "<i class='fa fa-check' aria-hidden=true></i>" : ""
              }
            );
          } else {
            return (
              {
                companyName: result.name,
                industry: result.industries,
                revenue: (result.revenue).toLocaleString(),
                funding: (result.funding).toLocaleString(),
                companySize: (result.number_of_employees).toLocaleString(),
                companyLinkedin: result.company_linkedin ? '&#10003;' : "",
                companyTwitter: result.company_twitter ? "<i class='fa fa-check' aria-hidden=true></i>" : "",
                companyHomePage: result.company_home_page ? "<i class='fa fa-check' aria-hidden=true></i>" : ""
              }
            )
          }


          // return (
          //   <Results index={index} key={result.id} name={result.person.name} age={result.person.age} jobTitle={result.title} companyName={result.company.name} checked={this.props.rowState[index]} callback={this.props.checkRow} />
          // );
        })
      } else if (data.results !== undefined) {
        return (
          <div class="eleven columns">
            <div id="noResultsContainer" class="white-background">
              <img id="noResultsImg" src="src/img/no_search_results.png" />
              <span id="noResultsMessage" class="electric-blue">No Search Results</span>
            </div>
          </div>
        )
      }


}
