import * as rssTypes from './rss.types';

export const fetchRSSStart = (url:string) => ({
  type: rssTypes.FETCH_RSS_START,
  payload: { url }
});

export const fetchRSSSuccess = (data:any, url:string) => ({
  type: rssTypes.FETCH_RSS_SUCCESS,
  payload: { data, url }
});

export const fetchRSSFail = (error:any) => ({
  type: rssTypes.FETCH_RSS_FAIL,
  payload: error
});

export const fetchRSSHistory = () => ({
  type: rssTypes.FETCH_RSS_HISTORY_START,
  payload: { }
});

export const fetchRSSHistorySuccess = (data:any) => ({
  type: rssTypes.FETCH_RSS_HISTORY_SUCCESS,
  payload: data
});

export const fetchRSSHistoryFail = (error:any) => ({
  type: rssTypes.FETCH_RSS_HISTORY_FAIL,
  payload: error
});
