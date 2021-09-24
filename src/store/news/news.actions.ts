import * as newsTypes from './news.types';

export const fetchNewsStart = () => {
 
  return ({
    type: newsTypes.FETCH_NEWS_START,
    payload: { }
  })
};

export const fetchNewsSuccess = (data:any) => ({
  type: newsTypes.FETCH_NEWS_SUCCESS,
  payload: { data }
});

export const fetchNewsFail = (error:any) => ({
  type: newsTypes.FETCH_NEWS_FAIL,
  payload: { error }
});

export const readMoreRedirect = (url:string) => ({
  type: newsTypes.READ_MORE_REDIRECT,
  payload: { url }
});
