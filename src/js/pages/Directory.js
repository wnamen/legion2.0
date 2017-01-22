import React, { Component, PropTypes } from "react"
import DirectoryMenu from "../components/directory/DirectoryMenu"
import DirectoryTable from "../components/directory/DirectoryTable"


class Directory extends Component {
  
  constructor(props, context) {
    super(props, context);
    
    const {type, id} = props.params;
    
    this.state = {
      groupView: id && id.length === 2,
      list: [],
      current: {
        directory: type || '',
        subDirectory: id || '',
        group: id && id.length === 2 ? id : '',
        groupView: type && id ? false : null,
      }
    };
  }
  
  componentWillMount() {
    const { type, id } = this.props.params;
    const { http } = this.context;
  
    if(id && id.length === 2) {
      http.get(`/directory/${type}`, { params: {
        name: id,
      }}).then(response => this.setState({
        list: response.data
      }))
    }
  }
  
  componentWillReceiveProps(nextProps) {
    const { type, id } = nextProps.params;
    const { http } = this.context;
    
    this.setState({
      groupView: id && id.length === 2,
      list: [],
      current: {
        directory: type || '',
        subDirectory: id || '',
        group: id && id.length === 2 ? id : '',
        groupView: type && id ? false : null,
      }
    });
    
    if(id && id.length === 2){
      http.get(`/directory/${type}`, { params: {
        name: id,
      }}).then(response => this.setState({
        list: response.data
      }))
    }
  };

  render() {
    const { current, groupView, list } = this.state;
    return (
      <div class="gray-light-background">
        <div class="sixteen columns">
          <DirectoryMenu />
          <DirectoryTable current={current} list={list} groupView={groupView} />
        </div>
      </div>
    );
  }
}

Directory.contextTypes = {
  http: PropTypes.func.isRequired
};


export default Directory;