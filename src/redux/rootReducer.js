import { combineReducers } from "redux";
import eventsReducer from "./reducer";

const rootReducer = combineReducers({
  data: eventsReducer,
})

export default rootReducer;