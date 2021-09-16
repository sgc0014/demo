import { takeLatest, call, put, all } from "redux-saga/effects";
import { Auth } from "aws-amplify";
import axios, { AxiosResponse } from "axios";
import * as AuthType from "./auth.types";
import * as authActions from "./auth.actions";
import * as userActions from "../user/user.actions";
import * as userHistoryActions from "../userHistory/userHistory.actions";
import { showSnackbarNotification } from "../notification/notification.actions";

export function* loadUserAsync() {
  try {
    yield Auth.currentSession();
    const { username, attributes } = yield Auth.currentAuthenticatedUser();
    const uid = attributes.sub;
    const userData = {
      username,
      uid,
      name: attributes.name,
      email: attributes.email,
    };

    yield put(userActions.fetchProfileStart(uid));
    yield put(userHistoryActions.fetchFollowList(uid));
    // load details to auth state
    yield put(authActions.loadUserSuccess(userData));
  } catch (err) {
    console.error(err);
    // yield put(loadUserFail(err));
  } finally {
    yield put(authActions.loadUserFinally());
  }
}

export function* onSigninAsync({
  payload: {
    formData: { email, password },
    router,
  },
}: any) {
  try {
    const { username, attributes } = yield Auth.signIn(email, password);
    const uid = attributes.sub;
    const userData = {
      username,
      uid,
      name: attributes.name,
      email: attributes.email,
    };

    yield put(userActions.fetchProfileStart(uid));
    yield put(userHistoryActions.fetchFollowList(uid));
    // load details to auth state
    yield put(authActions.loadUserSuccess(userData));

    const rollbackUrl: string = yield localStorage.getItem("rollback_url");
    if (rollbackUrl) {
      yield router.push(rollbackUrl);
      return;
    }
    yield put(
      showSnackbarNotification("success", "User logged in successfully.")
    );
    yield router.push("/dashboard");
  } catch (err: any) {
    console.error(err);
    yield put(showSnackbarNotification("error", err.message));
    yield put(authActions.signinFail(err.message));
  }
}

export function* onSignupAsync({ payload: { formData } }: any) {
  try {
    const data: AxiosResponse = yield axios.post(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/signup",
      formData
    );
    console.log(data);
    yield put(authActions.signupSuccess());
  } catch (err: any) {
    console.error(err);
    yield put(authActions.signupFail(err.message));
  }
}

export function* signOutAsync() {
  try {
    yield Auth.signOut();
    yield put(authActions.signoutSuccess());
    yield put(
      showSnackbarNotification("success", "User logged out successfully.")
    );
  } catch (err: any) {
    console.error(err);
    yield put(showSnackbarNotification("error", err.message));
    yield put(authActions.signoutFail(err));
  }
}

export function* watchLoadUser() {
  yield takeLatest(AuthType.LOAD_USER_START, loadUserAsync);
}

export function* watchSignin() {
  yield takeLatest(AuthType.SIGN_IN_START, onSigninAsync);
}

export function* watchSignup() {
  yield takeLatest(AuthType.SIGN_UP_START, onSignupAsync);
}

export function* watchSignout() {
  yield takeLatest(AuthType.SIGN_OUT_START, signOutAsync);
}

export function* authSagas() {
  yield all([
    call(watchSignin),
    call(watchSignup),
    call(watchSignout),
    call(watchLoadUser),
  ]);
}
