import * as EarlyAccessType from './earlyAccess.types';

export const setDialogOpen = (value:any) => ({
  type: EarlyAccessType.SET_DIALOG_OPEN,
  payload: value
});

export const setMessageOpen = (value:any, title:string | null, message:string | null) => ({
  type: EarlyAccessType.SET_MESSAGE_OPEN,
  payload: { value, title, message }
});

export const earlyAccessStart = (email:string) => ({
  type: EarlyAccessType.EARLY_ACCESS_START,
  payload: { email }
});

export const earlyAccessSuccess = (data:any) => ({
  type: EarlyAccessType.EARLY_ACCESS_SUCCESS,
  payload: data
});

export const earlyAccessFail = (error:any) => ({
  type: EarlyAccessType.EARLY_ACCESS_FAIL,
  payload: error
});

