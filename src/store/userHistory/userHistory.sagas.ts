import { takeLatest, call, put, all, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import * as UserHistoryType from "./userHistory.types";
import * as UserHistoryAction from "./userHistory.actions";
import {
  fetchFollowSuccess,
  fetchFollowFail,
  followSuccess,
  followFail,
  unFollowSuccess,
  unFollowFail,
} from "./userHistory.actions";
import { IAuth, ISpacrun } from "src/interface/";
import { RootState } from "..";

const getAuthState = (state: RootState) => state.auth;
const getSpacrunState = (state: RootState) => state.spacrun;

export function* fetchFollowListAsync({ payload: { userid } }: any) {
  try {
    // const authState = yield select(getAuthState);
    // const userid = authState.currentUser.uid;
    // console.log('userid: ', userid);
    if (userid) {
      const { data } = yield axios.get(
        `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/heart/list/${userid}`
      );
      const list = data.map((item: any) => item.symbol);
      // console.log('data: ', data);
      yield put(fetchFollowSuccess(list, data));
    }
  } catch (err: any) {
    console.error(err);
    yield put(fetchFollowFail(err));
  }
}

export function* followAsync({ payload: { value } }: any) {
  try {
    console.log("start")
    const authState: IAuth = yield select(getAuthState);
    const { spac }: ISpacrun = yield select(getSpacrunState);
    const userid = authState.currentUser.uid;
    const result: AxiosResponse = yield axios.post(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/heart/set",
      {
        code: value,
        name: spac[value].name,
        userid,
      }
    );
    console.log(result);
    yield put(followSuccess(value, result.data));
  } catch (err: any) {
    console.error(err);
    yield put(followFail(err.message));
  }
}

export function* unFollowAsync({ payload: { value } }: any) {
  try {
    const authState: IAuth = yield select(getAuthState);
    const userid: string | undefined = authState.currentUser.uid;
    // console.log('value: ', value);
    const result: AxiosResponse = yield axios.post(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/heart/clear",
      {
        code: value,
        userid,
      }
    );
    console.log(result);
    yield put(unFollowSuccess(value));
  } catch (err: any) {
    console.error(err);
    yield put(unFollowFail(err.message));
  }
}

export function* setSPACEmailAlertSaveAsync({
  payload: { value, emailAlert },
}: any) {
  try {
    const authState: IAuth = yield select(getAuthState);
    const userid: string | undefined = authState.currentUser.uid;
    const { data } = yield axios.post(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/set/spacEmailAlert/${userid}`,
      {
        symbol: value,
        emailAlert,
      }
    );
    console.log("result: ", data);
    yield put(UserHistoryAction.setSPACEmailAlertSuccess(data));
  } catch (err: any) {
    console.error(err);
    yield put(UserHistoryAction.setSPACEmailAlertFail(err));
  }
}

export function* setSPACSMSAlertSaveAsync({
  payload: { value, smsAlert },
}: any) {
  try {
    const authState: IAuth = yield select(getAuthState);
    const userid: string | undefined = authState.currentUser.uid;
    const { data } = yield axios.post(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/set/spacSmsAlert/${userid}`,
      {
        symbol: value,
        smsAlert,
      }
    );
    console.log("result: ", data);
    yield put(UserHistoryAction.setSPACSMSAlertSuccess(data));
  } catch (err: any) {
    console.error(err);
    yield put(UserHistoryAction.setSPACSMSAlertFail(err));
  }
}

export function* fetchFollowListWatcher() {
  yield takeLatest(UserHistoryType.FETCH_FOLLOW_START, fetchFollowListAsync);
}

export function* watchFollowStart() {
  yield takeLatest(UserHistoryType.FOLLOW_START, followAsync);
}

export function* watchUnFollowStart() {
  yield takeLatest(UserHistoryType.UN_FOLLOW_START, unFollowAsync);
}

export function* watchSetSPACEmailAlertStart() {
  yield takeLatest(
    UserHistoryType.SET_SPAC_EMAIL_ALERT_START,
    setSPACEmailAlertSaveAsync
  );
}

export function* watchSetSPACSMSAlertStart() {
  yield takeLatest(
    UserHistoryType.SET_SPAC_SMS_ALERT_START,
    setSPACSMSAlertSaveAsync
  );
}

export function* userHistorySagas() {
  yield all([
    call(fetchFollowListWatcher),
    call(watchFollowStart),
    call(watchUnFollowStart),
    call(watchSetSPACEmailAlertStart),
    call(watchSetSPACSMSAlertStart),
  ]);
}
