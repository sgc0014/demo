import axios from 'axios';
import { AnyAction } from 'redux';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { setApp } from './app.action';
import * as actionTypes from './app.types';

export function* getAppASync({ payload: { formData } }: AnyAction) {
  try {
    console.log('123e', formData);
    const { data } = yield axios.post(
      'https://staging.vogelme.com/api/privacy/v0.5/app/info',
      {
        ...formData
      },
      {
        headers: {
          'x-lmd-api-key': '1f03dbf95ae642abbc66dd5cfb5797e5'
        }
      }
    );
    console.log('e', data);

    yield put(setApp(data));
  } catch (err) {
    console.log('err', err);
  }
}
export function* watchGetApp() {
  yield takeLatest(actionTypes.GET_APP_START, getAppASync);
}
export function* appSaga() {
  yield all([call(watchGetApp)]);
}
