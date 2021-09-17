import * as redditTypes from './reddit.types';

export const fetchTopRedditQueryStart = () => ({
  type: redditTypes.FETCH_TOP_QUERY_START,
  payload: { }
});

export const fetchTopRedditQuerySuccess = (data:any) => ({
  type: redditTypes.FETCH_TOP_QUERY_SUCCESS,
  payload: data
});

export const fetchTopRedditQueryFail = (error:any) => ({
  type: redditTypes.FETCH_TOP_QUERY_FAIL,
  payload: error
});

export const fetchPostsStart = (query:string) => ({
  type: redditTypes.FETCH_POSTS_START,
  payload: { query }
});

export const fetchPostsSuccess = (data:any) => ({
  type: redditTypes.FETCH_POSTS_SUCCESS,
  payload: data
});

export const fetchPostsFail = (error:any) => ({
  type: redditTypes.FETCH_POSTS_FAIL,
  payload: error
});

export const fetchCommentsStart = (query:string) => ({
  type: redditTypes.FETCH_COMMENTS_START,
  payload: { query }
});

export const fetchCommentsSuccess = (data:any) => ({
  type: redditTypes.FETCH_COMMENTS_SUCCESS,
  payload: data
});

export const fetchCommentsFail = (error:any) => ({
  type: redditTypes.FETCH_COMMENTS_FAIL,
  payload: error
});
