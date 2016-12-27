import React from "react"
import Autosuggest from 'react-autosuggest';

export default class industrySearch extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      value: "",
      suggestions: [],
      industrySuggestions: [],
		}
    this.handleIndustrySearch = this.handleIndustrySearch.bind(this);
  }

  console.log(this.props);

  handleIndustrySearch(query) {
    query = query.text

    $.ajax({
      url:`https://apidev.legionanalytics.com/api/industries/?format=json&page_size=100&${query}`,
      dataType:'json',
      cache:false,
      success:function(industries){
        this.setState({industrySuggestions: industries});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  getIndustrySuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let text_search = `search_text=${value}`.trim();
    this.props.onIndustrySearch({ text: text_search });

    return inputLength === 0 ? [] : this.props.industrySuggestions.results.filter(result =>
      result.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getIndustrySuggestionValue = suggestion => "";

  renderIndustrySuggestion = suggestion => (
      <option value={suggestion.id} title="industry">{suggestion.name}</option>
  );

  onIndustrySuggestionSearch = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onIndustrySuggestionsFetchRequested = ({ value }) => {
     this.setState({
       suggestions: this.getIndustrySuggestions(value)
     });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render(){
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onIndustrySuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getIndustrySuggestionValue}
        renderSuggestion={this.renderIndustrySuggestion}
        inputProps={inputProps.industry}
      />
    )
  }
}
