import * as AdminType from './admin.types';

export const fetchUserStart = () => ({
  type: AdminType.FETCH_USER_START,
  payload: { }
});

export const fetchUserSuccess = (data:any, userCount:any) => ({
  type: AdminType.FETCH_USER_SUCCESS,
  payload: { data, userCount }
});

export const fetchUserFail = (error:any) => ({
  type: AdminType.FETCH_USER_FAIL,
  payload: { error }
});

export const sendEmailStart = (userid:string) => ({
  type: AdminType.SEND_EMAIL_START,
  payload: { userid }
});

export const sendSMSStart = (userid:string) => ({
  type: AdminType.SEND_SMS_START,
  payload: { userid }
});
