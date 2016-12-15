import { combineReducers } from "redux"

import search from "./searchReducer"
import contacts from "./contactsReducer"

export default combineReducers({
  search,
  contacts,
})
