import {takeLatest, put, all, call, select} from 'redux-saga/effects';
import axios from 'axios';
import { showSnackbarNotification } from '../notification/notification.actions';
import * as rssTypes from './rss.types';
import * as rssActions from './rss.actions';
import { RootState } from '..';
import { IAuth } from 'src/interface/';

const getAuthState = (state:RootState) => state.auth;
const getRSSState = (state:RootState) => state.rss;

export function* fetchRssAsync({ payload: { url } }:any) {
  try {
    const authState:IAuth = yield select(getAuthState);
    const userid:string | undefined = authState.currentUser.uid;
    const { history } = yield select(getRSSState);
    const historyExists = history.some((x:any) => x.url === url);
    const { data } = yield axios.post(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/news/search',
      {
        rss: url,
        userid: !historyExists ? userid : null
      }
    );
    // console.log('data: ', data);
    if (data.item) {
      yield put(rssActions.fetchRSSSuccess(data.item, url));
    } else {
      yield put(
        showSnackbarNotification(
          'error',
          'No data found. Please enter the valid RSS field.'
        )
      );
    }
  } catch (e) {
    console.error(e);
    yield put(
      showSnackbarNotification('error', 'Please enter the valid RSS field.')
    );
    yield put(rssActions.fetchRSSFail(e));
  }
}

export function* fetchRssHistoryAsync() {
  try {
    const authState:IAuth = yield select(getAuthState);
    const userid:string | undefined = authState.currentUser.uid;
    const { data } = yield axios.get(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/rssHistory/${userid}`
    );
    if (data) {
      yield put(rssActions.fetchRSSHistorySuccess(data));
    }
  } catch (err) {
    console.error(err);
    yield put(
      showSnackbarNotification('error', 'Error on fetching rss history.')
    );
    yield put(rssActions.fetchRSSHistoryFail(err));
  }
}

export function* watchFetchRss() {
  yield takeLatest(rssTypes.FETCH_RSS_START, fetchRssAsync);
}

export function* watchFetchRssHistory() {
  yield takeLatest(rssTypes.FETCH_RSS_HISTORY_START, fetchRssHistoryAsync);
}

export function* rssSagas() {
  yield all([
    call(watchFetchRss),
    call(watchFetchRssHistory)
  ]);
}
