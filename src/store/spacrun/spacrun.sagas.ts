import { all, call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import * as spacRunTypes from "./spacrun.types";
import * as spacRunActions from "./spacrun.actions";
import { fetchHistoricalStart } from "./spacrun.actions";

export function* fetchTopListAsync() {
  try {
    const topGainers: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/top/gainer"
    );
    const topLosers: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/top/losers"
    );
    const topVolumeLeaders: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/top/volumeLeaders"
    );
    const weeklyGainers: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/weeklyGainer"
    );
    const weeklyLosers: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/weeklyLosers"
    );
    const monthlyGainers: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/monthlyGainer"
    );
    const monthlyLosers: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/monthlyLosers"
    );
    const averageVolume: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/averageVolume"
    );
    const volumeSpike: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/volumeSpike"
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
      volumeSpike: volumeSpike.data.list,
    };
    yield put(spacRunActions.fetchTopListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(spacRunActions.fetchTopListFail(e));
  }
}

export function* fetchSpacListAsync() {
  try {
   
    const spacList: AxiosResponse = yield axios.get(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/spac/list"
    );
    const data = {
      date: spacList.data.date,
      spac: spacList.data.list,
    };
    yield put(spacRunActions.fetchSpacListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(spacRunActions.fetchSpacListFail(e));
  }
}

export function* fetchSpacHistoricalAsync({
  payload: { symbol },
}: ReturnType<typeof fetchHistoricalStart>) {
  try {
    let data = {};
    const response: AxiosResponse = yield axios.get(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/list/spac/history/${symbol}`
    );
    if (response) {
      data = {
        name: symbol,
        historical: response.data.historical,
        candleData: response.data.candle,
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
    call(watchFetchSpacHistorical),
  ]);
}
