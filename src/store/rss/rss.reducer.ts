import * as rssTypes from "./rss.types";
import _ from "lodash";

const INITIAL_STATE = {
  isFetching: false,
  isFetchingHistory: false,
  url: null,
  results: [],
  history: [],
  errors: {},
};

const rssReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  let updatedState: any = {};
  switch (type) {
    case rssTypes.FETCH_RSS_START:
      return {
        ...state,
        isFetching: true,
        url: payload.url,
        results: [],
      };

    case rssTypes.FETCH_RSS_SUCCESS:
      updatedState = {
        ...state,
        isFetching: false,
      };
      updatedState.results = payload.data;
      updatedState.history = _.uniq(
        [].concat(updatedState.history, { url: payload.url })
      );
      return updatedState;

    case rssTypes.FETCH_RSS_FAIL:
      return {
        ...state,
        isFetching: false,
        errors: payload,
      };

    case rssTypes.FETCH_RSS_HISTORY_START:
      return {
        ...state,
        isFetchingHistory: true,
      };

    case rssTypes.FETCH_RSS_HISTORY_SUCCESS:
      return {
        ...state,
        isFetchingHistory: false,
        history: payload,
      };

    case rssTypes.FETCH_RSS_HISTORY_FAIL:
      return {
        ...state,
        isFetchingHistory: false,
        errors: payload,
      };

    default:
      return state;
  }
};

export default rssReducer;
