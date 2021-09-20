import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import earlyAccessReducer from "./earlyAccess/earlyAccess.reducer";
import newsReducer from "./news/news.reducer";
import notificationReducer from "./notification/notification.reducer";
import redditReducer from "./reddit/reddit.reducer";
import rssReducer from "./rss/rss.reducer";
import searchReducer from "./search/search.reducer";
import siteCoordinatorReducer from "./siteCoordinator/siteCoordinator.reducer";
import spacrunReducer from "./spacrun/spacrun.reducers";
import userReducer from "./user/user.reducer";
import userHistoryReducer from "./userHistory/userHistory.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  spacrun: spacrunReducer,
  siteCoordinator: siteCoordinatorReducer,
  user: userReducer,
  notification: notificationReducer,
  userHistory: userHistoryReducer,
  earlyAccess: earlyAccessReducer,
  news: newsReducer,
  rss: rssReducer,
  reddit:redditReducer,
  search:searchReducer
});

export default rootReducer;
