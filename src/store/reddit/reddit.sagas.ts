import {takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';
import * as redditTypes from './reddit.types';
import * as redditActions from './reddit.actions';
import { showSnackbarNotification } from '../notification/notification.actions';

export function* fetchTopQueryAsync() {
  try {
    const { data } = yield axios.get(
      'https://6tz62zqe5b.execute-api.us-east-1.amazonaws.com/dev/list/topRedditQuery'
    );
    console.log('data: ', data);
    yield put(redditActions.fetchTopRedditQuerySuccess(data[0].spaclist));
  } catch (e) {
    console.error(e);
    yield put(
      showSnackbarNotification('error', 'Error on fetch top query.')
    );
    yield put(redditActions.fetchTopRedditQueryFail(e));
  }
}

export function* fetchPostsAsync({ payload: { query } }:any) {
  try {
    // console.log('seeMorePosts: ', query, after);
    // const { data } = yield axios.get(
    //   `https://socialgrep.p.rapidapi.com/search/posts?query=${query}&after=${after}`,
    //   {
    //     headers: {
    //       "x-rapidapi-key": "7bb052124cmsh2cea613cc4c90bap1842aejsn9eb4800f1c60",
    //       "x-rapidapi-host": "socialgrep.p.rapidapi.com",
    //       "useQueryString": true
    //     }
    //   }
    // );
    const { data } = yield axios.get(
      `https://6tz62zqe5b.execute-api.us-east-1.amazonaws.com/dev/list/postSentiment/${query}`
    );
    console.log('posts: ', data);
    yield put(redditActions.fetchPostsSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(
      showSnackbarNotification('error', 'Error on search.')
    );
    yield put(redditActions.fetchPostsFail(e));
  }
}

export function* fetchCommentsAsync({ payload: { query } }:any) {
  try {
    // console.log('seeMoreComments: ', query, after);
    // const { data } = yield axios.get(
    //   `https://socialgrep.p.rapidapi.com/search/comments?query=${query}&after=${after}`,
    //     {
    //       headers: {
    //         "x-rapidapi-key": "7bb052124cmsh2cea613cc4c90bap1842aejsn9eb4800f1c60",
    //         "x-rapidapi-host": "socialgrep.p.rapidapi.com",
    //         "useQueryString": true
    //       }
    //     }
    // );
    const { data } = yield axios.get(
        `https://6tz62zqe5b.execute-api.us-east-1.amazonaws.com/dev/list/commentSentiment/${query}`
    );
    console.log('comments: ', data);
    yield put(redditActions.fetchCommentsSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(
      showSnackbarNotification('error', 'Error on search.')
    );
    yield put(redditActions.fetchCommentsFail(e));
  }
}

export function* watchFetchTopQuery() {
  yield takeLatest(redditTypes.FETCH_TOP_QUERY_START, fetchTopQueryAsync);
}

export function* watchFetchPosts() {
  yield takeLatest(redditTypes.FETCH_POSTS_START, fetchPostsAsync);
}

export function* watchFetchComments() {
  yield takeLatest(redditTypes.FETCH_COMMENTS_START, fetchCommentsAsync);
}

export function* redditSagas() {
  yield all([
    call(watchFetchTopQuery),
    call(watchFetchPosts),
    call(watchFetchComments),
  ]);
}
