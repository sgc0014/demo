import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import notificationReducer from "./notification/notification.reducer";
import siteCoordinatorReducer from "./siteCoordinator/siteCoordinator.reducer";
import spacrunReducer from "./spacrun/spacrun.reducers";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  spacrun: spacrunReducer,
  siteCoordinator:siteCoordinatorReducer,
  user:userReducer,
  notification:notificationReducer
});

export default rootReducer;
