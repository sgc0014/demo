import * as spacRunTypes from './spacrun.types';

export const fetchTopListStart = () => ({
  type: spacRunTypes.FETCH_TOP_LIST_START,
  payload: { }
});

export const fetchTopListSuccess = (data:any) => ({
  type: spacRunTypes.FETCH_TOP_LIST_SUCCESS,
  payload: { data }
});

export const fetchTopListFail = (error:any) => ({
  type: spacRunTypes.FETCH_TOP_LIST_FAIL,
  payload: { error }
});

export const fetchSpacListStart = () => ({
  type: spacRunTypes.FETCH_SPAC_LIST_START,
  payload: { }
});

export const fetchSpacListSuccess = (data:any) => ({
  type: spacRunTypes.FETCH_SPAC_LIST_SUCCESS,
  payload: { data }
});

export const fetchSpacListFail = (error:any) => ({
  type: spacRunTypes.FETCH_SPAC_LIST_FAIL,
  payload: { error }
});

export const fetchHistoricalStart = (symbol:any) => ({
  type: spacRunTypes.FETCH_SPAC_HISTORICAL_START,
  payload: { symbol }
});

export const fetchHistoricalSuccess = (data:any) => ({
  type: spacRunTypes.FETCH_SPAC_HISTORICAL_SUCCESS,
  payload: data
});

export const fetchHistoricalFail = (error:any) => ({
  type: spacRunTypes.FETCH_SPAC_HISTORICAL_FAIL,
  payload: error
});
