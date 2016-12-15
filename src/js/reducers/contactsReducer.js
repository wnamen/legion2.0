export default function reducer(state={
    contacts: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_CONTACTS": {
        return {...state, fetching: true}
      }
      case "FETCH_CONTACTS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_CONTACTS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          contacts: action.payload,
        }
      }
    }

    return state
}
