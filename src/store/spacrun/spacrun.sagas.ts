import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as spacRunTypes from './spacrun.types';
import * as spacRunActions from './spacrun.actions';

export function* fetchTopListAsync() {
  try {
    const topGainers = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/top/gainer'
    );
    const topLosers = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/top/losers'
    );
    const topVolumeLeaders = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/top/volumeLeaders'
    );
    const weeklyGainers = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/weeklyGainer'
    );
    const weeklyLosers = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/weeklyLosers'
    );
    const monthlyGainers = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/monthlyGainer'
    );
    const monthlyLosers = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/monthlyLosers'
    );
    const averageVolume = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/averageVolume'
    );
    const volumeSpike = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/volumeSpike'
    );
    const data = {
      date: topGainers.data.date,
      updateDate: weeklyGainers.data.date,
      gainers: topGainers.data.list,
      losers: topLosers.data.list,
      volumeLeaders: topVolumeLeaders.data.list,
      weeklyGainers: weeklyGainers.data.list,
      weeklyLosers: weeklyLosers.data.list,
      monthlyGainers: monthlyGainers.data.list,
      monthlyLosers: monthlyLosers.data.list,
      averageVolume: averageVolume.data.list,
      volumeSpike: volumeSpike.data.list
    };
    yield put(spacRunActions.fetchTopListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(spacRunActions.fetchTopListFail(e));
  }
}

export function* fetchSpacListAsync() {
  try {
    const spacList = yield axios.get(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/spac/list'
    );
    const data = {
      date: spacList.data.date,
      spac: spacList.data.list
    };
    yield put(spacRunActions.fetchSpacListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(spacRunActions.fetchSpacListFail(e));
  }
}

export function* fetchSpacHistoricalAsync({ payload: { symbol } }) {
  try {
    let data = {};
    const response = yield axios.get(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/spac/history/${symbol}`
    );
    if (response) {
      data = {
        name: symbol,
        historical: response.data.historical,
        candleData: response.data.candle
      };
    }
    yield put(spacRunActions.fetchHistoricalSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(spacRunActions.fetchHistoricalFail(e));
  }
}

export function* watchFetchTopList() {
  yield takeLatest(spacRunTypes.FETCH_TOP_LIST_START, fetchTopListAsync);
}

export function* watchFetchSpacList() {
  yield takeLatest(spacRunTypes.FETCH_SPAC_LIST_START, fetchSpacListAsync);
}

export function* watchFetchSpacHistorical() {
  yield takeLatest(
    spacRunTypes.FETCH_SPAC_HISTORICAL_START,
    fetchSpacHistoricalAsync
  );
}

export function* spacrunSagas() {
  yield all([
    call(watchFetchTopList),
    call(watchFetchSpacList),
    call(watchFetchSpacHistorical)
  ]);
}
