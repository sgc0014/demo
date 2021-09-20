import * as SearchType from './search.types';

export const searchStart = (value:any, history:any) => ({
  type: SearchType.SEARCH_START,
  payload: { value, history }
});

export const searchSuccess = (data:any) => ({
  type: SearchType.SEARCH_SUCCESS,
  payload: data
});

export const searchFail = (err:any) => ({
  type: SearchType.SEARCH_FAIL,
  payload: err
});
