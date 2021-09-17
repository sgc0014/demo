import { all, call } from "redux-saga/effects";
import { authSagas } from "./auth/auth.sagas";
import { spacrunSagas } from "./spacrun/spacrun.sagas";
import { newsSagas } from "./news/news.sagas";
import { rssSagas } from "./rss/rss.sagas";
import { redditSagas } from "./reddit/reddit.sagas";

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(spacrunSagas),
    call(newsSagas),
    call(rssSagas),
    call(redditSagas),
  ]);
}
