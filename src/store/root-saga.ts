import { all, call } from "redux-saga/effects";
import { authSagas } from "./auth/auth.sagas";
import { spacrunSagas } from "./spacrun/spacrun.sagas";

export default function* rootSaga() {
  yield all([call(authSagas), call(spacrunSagas)]);
}
