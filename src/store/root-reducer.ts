import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import spacrunReducer from "./spacrun/spacrun.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  spacrun: spacrunReducer,
});

export default rootReducer;
