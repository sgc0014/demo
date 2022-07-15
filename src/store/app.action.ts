import * as actionTypes from './app.types';

export const setApp = (app: any) => ({
  type: actionTypes.SET_APP,
  payload: app
});

export const getApp = (formData: any) => ({
  type: actionTypes.GET_APP_START,
  payload: { formData }
});
