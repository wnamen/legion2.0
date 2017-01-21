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
    return {
      http: axios.create({
        baseURL: 'https://api.legionanalytics.com/',
        headers: {
          'Authorization': `Token ${cookie.load("token")}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    };
  }
  
  render() {
    return Children.only(this.props.children);
  }
}

export default HttpProvider;