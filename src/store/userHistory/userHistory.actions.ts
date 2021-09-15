import * as UserHistoryType from './userHistory.types';

export const fetchFollowList = (userid:string) => ({
  type: UserHistoryType.FETCH_FOLLOW_START,
  payload: { userid }
});

export const fetchFollowSuccess = (list:any, data:any) => ({
  type: UserHistoryType.FETCH_FOLLOW_SUCCESS,
  payload: { list, data }
});

export const fetchFollowFail = (err:any) => ({
  type: UserHistoryType.FETCH_FOLLOW_FAIL,
  payload: { err }
});

export const followStart = (value:any) => ({
  type: UserHistoryType.FOLLOW_START,
  payload: { value }
});

export const followSuccess = (value:any, items:any) => ({
  type: UserHistoryType.FOLLOW_SUCCESS,
  payload: { value, items }
});

export const followFail = (error:any) => ({
  type: UserHistoryType.FOLLOW_FAIL,
  payload: error
});

export const unFollowStart = (value:any) => ({
  type: UserHistoryType.UN_FOLLOW_START,
  payload: { value }
});

export const unFollowSuccess = (value:any) => ({
  type: UserHistoryType.UN_FOLLOW_SUCCESS,
  payload: { value }
});

export const unFollowFail = (err:any) => ({
  type: UserHistoryType.UN_FOLLOW_FAIL,
  payload: { err }
});

export const setSPACEmailAlertStart = (value:any, emailAlert:any) => ({
  type: UserHistoryType.SET_SPAC_EMAIL_ALERT_START,
  payload: { value, emailAlert }
});

export const setSPACEmailAlertSuccess = (data:any) => ({
  type: UserHistoryType.SET_SPAC_EMAIL_ALERT_SUCCESS,
  payload: data
});

export const setSPACEmailAlertFail = (err:any) => ({
  type: UserHistoryType.SET_SPAC_EMAIL_ALERT_FAIL,
  payload: err
});

export const setSPACSMSAlertStart = (value:any, smsAlert:any) => ({
  type: UserHistoryType.SET_SPAC_SMS_ALERT_START,
  payload: { value, smsAlert }
});

export const setSPACSMSAlertSuccess = (data:any) => ({
  type: UserHistoryType.SET_SPAC_SMS_ALERT_SUCCESS,
  payload: data
});

export const setSPACSMSAlertFail = (err:any) => ({
  type: UserHistoryType.SET_SPAC_SMS_ALERT_FAIL,
  payload: err
});
