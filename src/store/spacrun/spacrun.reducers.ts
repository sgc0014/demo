import { ISpacrun } from 'src/interface/';
import * as spacRunTypes from './spacrun.types';

const INITIAL_STATE = {
  loading: false,
  spacLoading: false,
  date: null, // for daily scrape data
  updateDate: null, // for weekly/monthly scrape data
  spacDate: null, // for browse spac list
  spac: {},
  historicalLoading: false,
  spacHistory: {},
  gainers: [],
  losers: [],
  volumeLeaders: [],
  weeklyGainers: [],
  weeklyLosers: [],
  monthlyGainers: [],
  monthlyLosers: [],
  averageVolume: [],
  volumeSpike: [],
  errors: {}
};

const spacrunReducer = (state = INITIAL_STATE, action:any) => {
  const { type, payload } = action;
  let updatedState:any;
  switch (type) {
    case spacRunTypes.FETCH_TOP_LIST_START:
      return {
        ...state,
        loading: true,
      };

    case spacRunTypes.FETCH_TOP_LIST_SUCCESS:
      updatedState = {
        ...state,
      };
      updatedState.loading = false;
      updatedState.date = payload.data.date;
      updatedState.updateDate = payload.data.updateDate;
      updatedState.gainers = payload.data.gainers;
      updatedState.losers = payload.data.losers;
      updatedState.volumeLeaders = payload.data.volumeLeaders;
      updatedState.weeklyGainers = payload.data.weeklyGainers;
      updatedState.weeklyLosers = payload.data.weeklyLosers;
      updatedState.monthlyGainers = payload.data.monthlyGainers;
      updatedState.monthlyLosers = payload.data.monthlyLosers;
      updatedState.averageVolume = payload.data.averageVolume;
      updatedState.volumeSpike = payload.data.volumeSpike;
      return updatedState;

    case spacRunTypes.FETCH_TOP_LIST_FAIL:
      updatedState = {
        ...state,
      };
      updatedState.loading = false;
      updatedState.errors = payload.error;
      return updatedState;

    case spacRunTypes.FETCH_SPAC_LIST_START:
      return {
        ...state,
        spacLoading: true,
      };

    case spacRunTypes.FETCH_SPAC_LIST_SUCCESS:
      updatedState = {
        ...state,
        spac: {
          ...state.spac,
        }
      };
      updatedState.spacLoading = false;
      updatedState.spacDate = payload.data.date;
      payload.data.spac.forEach((meta:any) => {
        updatedState.spac[meta.symbol] = meta;
      });
      return updatedState;

    case spacRunTypes.FETCH_SPAC_LIST_FAIL:
      updatedState = {
        ...state,
      };
      updatedState.spacLoading = false;
      updatedState.errors = payload.error;
      return updatedState;

    case spacRunTypes.FETCH_SPAC_HISTORICAL_START:
      return {
        ...state,
        historicalLoading: true,
      };

    case spacRunTypes.FETCH_SPAC_HISTORICAL_SUCCESS:
      updatedState = {
        ...state,
        historicalLoading: false,
      };
      updatedState.spacHistory[payload.name] = payload;
      return updatedState;

    case spacRunTypes.FETCH_SPAC_HISTORICAL_FAIL:
      return {
        ...state,
        historicalLoading: false,
        errors: payload
      };

    default:
      return state;
  }
};

export default spacrunReducer;
