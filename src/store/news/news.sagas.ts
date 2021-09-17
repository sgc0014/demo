import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import * as newsTypes from "./news.types";
import * as newsActions from "./news.actions";
import { RootState } from "..";
import { IAuth, IUserHistoryState } from "src/interface/";

const getAuthState = (state: RootState) => state.auth;
const getUserHistoryState = (state: RootState) => state.userHistory;

export function* fetchNewsAsync() {
 
  const authState: IAuth = yield select(getAuthState);
  const userid: string = authState.currentUser.uid;
  const userHistoryState: IUserHistoryState = yield select(getUserHistoryState);
  const { follows } = userHistoryState;
  try {
    let response: AxiosResponse;
    if (follows.length) {
      response = yield axios.get(
        // `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/news/${userid}`
        `https://ydak4yeh7k.execute-api.us-east-1.amazonaws.com/dev/cision/releases/${userid}`
      );
    } else {
      console.log("else");
      response = yield axios.get(
        // 'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/news'
        "https://ydak4yeh7k.execute-api.us-east-1.amazonaws.com/dev/cision/releases"
      );
    }
    console.log("response: ", response);
    if (response.data.item) {
      yield put(newsActions.fetchNewsSuccess(response.data.item));
    }
  } catch (e) {
    console.error(e);
    yield put(newsActions.fetchNewsFail(e));
  }
}

export function* readMoreRedirect({ payload: { url } }: any) {
  try {
    if (url.toString().includes("contentapi.cision.com")) {
      const { data } = yield axios.post(
        "https://ydak4yeh7k.execute-api.us-east-1.amazonaws.com/dev/cision/releasesMore",
        {
          url,
        }
      );
      // console.log('data: ', data);
      window.open(data.links, "_blank");
    } else {
      window.open(url, "_blank");
    }
  } catch (error) {
    console.error(error);
  }
}

export function* watchFetchNews() {
  yield takeLatest(newsTypes.FETCH_NEWS_START, fetchNewsAsync);
}

export function* watchReadMoreRedirect() {
  yield takeLatest(newsTypes.READ_MORE_REDIRECT, readMoreRedirect);
}

export function* newsSagas() {
  yield all([call(watchFetchNews), call(watchReadMoreRedirect)]);
}
