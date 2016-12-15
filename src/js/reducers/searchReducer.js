export default function reducer(state={
    results: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_SEARCH": {
        return {...state, fetching: true}
      }
      case "FETCH_SEARCH_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_SEARCH_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          results: action.payload,
        }
      }
    }

    return state
}
