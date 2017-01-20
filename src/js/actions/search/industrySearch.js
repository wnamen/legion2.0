import React from "react"
import Autosuggest from 'react-autosuggest';

export default class IndustrySearch extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      value: "",
      suggestions: [],
      industrySuggestions: [],
		}
    this.handleIndustrySearch = this.handleIndustrySearch.bind(this);
  }

  componentWillMount(){
    let tokenHeader = `Token ${this.props.userToken}`;

    $.ajax({
      url: 'https://api.legionanalytics.com/search/industry/?page_size=100&num_companies__gt=0',
      headers: {"Authorization": tokenHeader},
      dataType:'json',
      crossDomain:true,
      cache:false,
      success:function(industries){
        this.setState({industrySuggestions: industries});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  handleIndustrySearch(query) {
    let tokenHeader = `Token ${this.props.userToken}`;
    query = query.text

    $.ajax({
      url:`https://api.legionanalytics.com/search/industry/?page_size=100&num_companies__gt=0&${query}`,
      headers: {"Authorization": tokenHeader},
      dataType:'json',
      crossDomain:true,
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
    this.handleIndustrySearch({ text: text_search });

    return inputLength === 0 ? [] : this.state.industrySuggestions.results.filter(result =>
      result.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getIndustrySuggestionValue = suggestion => "";

  renderIndustrySuggestion = suggestion => (
      <option value={suggestion.industry_id} title="industry">{suggestion.name}</option>
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
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onIndustrySuggestionSearch
    }

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionSelected={this.props.onDebouncer}
        onSuggestionsFetchRequested={this.onIndustrySuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getIndustrySuggestionValue}
        renderSuggestion={this.renderIndustrySuggestion}
        inputProps={inputProps}
      />
    )
  }
}
