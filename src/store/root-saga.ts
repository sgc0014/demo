import { all, call } from "redux-saga/effects";
import { authSagas } from "./auth/auth.sagas";
import { spacrunSagas } from "./spacrun/spacrun.sagas";
import { newsSagas } from "./news/news.sagas";
import { rssSagas } from "./rss/rss.sagas";
import { redditSagas } from "./reddit/reddit.sagas";
import { searchSagas } from "./search/search.sagas";
import { userHistorySagas } from "./userHistory/userHistory.sagas";
import { userSagas } from "./user/user.sagas";
import { adminSagas } from "./admin/admin.sagas";

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(spacrunSagas),
    call(newsSagas),
    call(rssSagas),
    call(redditSagas),
    call(searchSagas),
    call(userHistorySagas),
    call(userSagas),
    call(adminSagas),
  ]);
}
