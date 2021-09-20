import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as SearchType from './search.types';
import {
  // eslint-disable-next-line import/named
  searchSuccess,
  // eslint-disable-next-line import/named
  searchFail
} from './search.actions';

export function* searchAsync({ payload: { value, history } }:any) {
  try {
    yield put(searchSuccess(value));
    yield history.push(`/view/${value}`);
  } catch (err:any) {
    console.error(err);
    yield put(searchFail(err.message));
  }
}

export function* watchSearch() {
  yield takeLatest(SearchType.SEARCH_START, searchAsync);
}

export function* searchSagas() {
  yield all([
    call(watchSearch),
  ]);
}
