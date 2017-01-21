import React, { PropTypes, Component, Children } from 'react';
import axios from "axios";
import cookie from "react-cookie";


class HttpProvider extends Component {
  
  static propTypes = {
    children: PropTypes.any.isRequired
  };
  
  static childContextTypes = {
    http: PropTypes.func.isRequired,
  };
  
  getChildContext() {
    const auth = cookie.load("token") ? {'Authorization': `Token ${cookie.load("token")}`} : null;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...auth
    } ;
    
    return {
      http: axios.create({
        baseURL: 'https://api.legionanalytics.com/',
        headers: headers
      })
    };
  }
  
  render() {
    return Children.only(this.props.children);
  }
}

export default HttpProvider;