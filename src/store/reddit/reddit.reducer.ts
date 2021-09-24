import { HYDRATE } from "next-redux-wrapper";
import * as redditTypes from "./reddit.types";

const INITIAL_STATE = {
  isFetchingTop: false,
  topList: [],
  isFetching: false,
  query: null,
  posts: [],
  comments: [],
  errors: {},
  test: {},
};

const redditReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  let updatedState: any = {};
  switch (type) {
    case HYDRATE: {
      return { ...state, ...action.payload.reddit };
    }
    case redditTypes.FETCH_TOP_QUERY_START:
      return {
        ...state,
        isFetchingTop: true,
      };

    case redditTypes.FETCH_TOP_QUERY_SUCCESS:
      return {
        ...state,
        isFetchingTop: false,
        topList: payload,
      };

    case redditTypes.FETCH_TOP_QUERY_FAIL:
      return {
        ...state,
        isFetchingTop: false,
        errors: payload,
      };

    case redditTypes.FETCH_POSTS_START:
      return {
        ...state,
        isFetching: true,
        query: payload.query,
      };

    case redditTypes.FETCH_POSTS_SUCCESS:
      updatedState = {
        ...state,
        isFetching: false,
      };
      updatedState.posts = payload;
      return updatedState;

    case redditTypes.FETCH_POSTS_FAIL:
      return {
        ...state,
        isFetching: false,
        errors: payload,
      };

    case redditTypes.FETCH_COMMENTS_START:
      return {
        ...state,
        isFetching: true,
        query: payload.query,
      };

    case redditTypes.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: payload,
      };

    case redditTypes.FETCH_COMMENTS_FAIL:
      return {
        ...state,
        isFetching: false,
        errors: payload,
      };

    default:
      return state;
  }
};

export default redditReducer;
