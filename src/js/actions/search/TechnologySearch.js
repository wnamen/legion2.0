import React from "react"
import Autosuggest from 'react-autosuggest';

export default class TechonologySearch extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      value: "",
      suggestions: [],
      technologySuggestions: [],
		}
    this.handleTechnologySearch = this.handleTechnologySearch.bind(this);
  }

  componentWillMount(){
    $.ajax({
      url: 'https://apidev.legionanalytics.com/api/technologies/?format=json&page_size=145',
      dataType:'json',
      cache:false,
      success:function(technologies){
        this.setState({technologySuggestions: technologies});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  handleTechnologySearch(query) {
    query = query.text

    $.ajax({
      url:`https://apidev.legionanalytics.com/api/technologies/?format=json&page_size=100&${query}`,
      dataType:'json',
      cache:false,
      success:function(technologies){
        this.setState({technologySuggestions: technologies});
      }.bind(this),
      error:function(xhr, status, err){
      }.bind(this)
    });
  }

  getTechnologySuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let text_search = `search_text=${value}`.trim();
    this.handleTechnologySearch({ text: text_search });

    return inputLength === 0 ? [] : this.state.technologySuggestions.results.filter(result =>
      result.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getTechnologySuggestionValue = suggestion => "";

  renderTechnologySuggestion = suggestion => (
    <option value={suggestion.id} title="technology">{suggestion.name}</option>
  );

  onTechnologySuggestionSearch = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onTechnologySuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getTechnologySuggestions(value)
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
      onChange: this.onTechnologySuggestionSearch
    }

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionSelected={this.props.onDebouncer}
        onSuggestionsFetchRequested={this.onTechnologySuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getTechnologySuggestionValue}
        renderSuggestion={this.renderTechnologySuggestion}
        inputProps={inputProps}
      />
    )
  }
}
