import axios from "axios";

export function fetchSearch() {
  return function(dispatch) {
    axios.get("/test_json")
      .then((response) => {
        console.log(response);
        dispatch({type: "FETCH_SEARCH_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_SEARCH_REJECTED", payload: err})
      })
  }
}
