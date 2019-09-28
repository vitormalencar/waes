import { combineReducers } from "redux";
import highlight from "./highlight";

const rootReducer = combineReducers({
  root: (state = null) => state,
  highlight
});

export default rootReducer;
