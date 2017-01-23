import React from "react"
import Autosuggest from 'react-autosuggest';

export default class InterestSearch extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      value: "",
      suggestions: [],
      interestSuggestions: [],
		}
    this.handleInterestSearch = this.handleInterestSearch.bind(this);
  }

  componentWillMount(){
    let tokenHeader = `Token ${this.props.userToken}`;

    $.ajax({
      url: 'https://api.legionanalytics.com/search/industry/?page_size=500&num_people__gt=0&',
      headers: {"Authorization": tokenHeader},
      dataType:'json',
      cache:false,
      success:function(interests){
        this.setState({interestSuggestions: interests});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  handleInterestSearch(query) {
    let tokenHeader = `Token ${this.props.userToken}`;
    query = query.text

    $.ajax({
      url:`https://api.legionanalytics.com/search/industry/?page_size=1000&num_people__gt=0&${query}`,
      headers: {"Authorization": tokenHeader},
      dataType:'json',
      cache:false,
      success:function(interests){
        this.setState({interestSuggestions: interests});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  getInterestSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let text_search = `name=${value}`.trim();
    this.handleInterestSearch({ text: text_search });

    return inputLength === 0 ? [] : this.state.interestSuggestions.results.filter(result =>
      result.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getInterestSuggestionValue = suggestion => "";

  renderInterestSuggestion = suggestion => (
    <option value={suggestion.industry_id} title="interest">{suggestion.name}</option>
  );

  onInterestSuggestionSearch = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onInterestSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getInterestSuggestions(value)
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
      onChange: this.onInterestSuggestionSearch,
      disabled: this.props.disabled
    }

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionSelected={this.props.onDebouncer}
        onSuggestionsFetchRequested={this.onInterestSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getInterestSuggestionValue}
        renderSuggestion={this.renderInterestSuggestion}
        inputProps={inputProps}
      />
    )
  }
}
