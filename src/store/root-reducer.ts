import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import siteCoordinatorReducer from "./siteCoordinator/siteCoordinator.reducer";
import spacrunReducer from "./spacrun/spacrun.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  spacrun: spacrunReducer,
  siteCoordinator:siteCoordinatorReducer
});

export default rootReducer;
