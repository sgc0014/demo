import * as UserType from './user.types';

export const setCheckedSMS = (value:any) => ({
  type: UserType.SET_SMS_SEND,
  payload: { value }
});

export const setCheckedEmail = (value:any) => ({
  type: UserType.SET_EMAIL_SEND,
  payload: { value }
});

export const profileSaveStart = (value:any) => ({
  type: UserType.PROFILE_SAVE_START,
  payload: { value }
});

export const profileSaveSuccess = (data:any) => ({
  type: UserType.PROFILE_SAVE_SUCCESS,
  payload: { data }
});

export const profileSaveFail = (err:any) => ({
  type: UserType.PROFILE_SAVE_FAIL,
  payload: { err }
});

export const sendStripePaymentEmail = (paymentType:any, firstname:string, email:string) => ({
  type: UserType.SEND_STRIPE_PAYMENT_EMAIL,
  payload: { paymentType, firstname, email }
});

export const subscribeUser = (sessionId:string) => ({
  type: UserType.SUBSCRIBE_USER_START,
  payload: { sessionId }
});

export const subscribeUserSuccess = (data:any) => ({
  type: UserType.SUBSCRIBE_USER_SUCCESS,
  payload: { data }
});

export const subscribeUserFail = (error:any) => ({
  type: UserType.SUBSCRIBE_USER_FAIL,
  payload: { error }
});

export const cancelSubscription = () => ({
  type: UserType.UN_SUBSCRIBE_START,
  payload: {}
});

export const cancelSubscriptionSuccess = (data:any) => ({
  type: UserType.UN_SUBSCRIBE_SUCCESS,
  payload: { data }
});

export const cancelSubscriptionFail = (error:any) => ({
  type: UserType.UN_SUBSCRIBE_FAIL,
  payload: { error }
});

export const fetchProfileStart = (userid:string) => ({
  type: UserType.FETCH_PROFILE_START,
  payload: { userid }
});

export const fetchProfileSuccess = (data:any) => ({
  type: UserType.FETCH_PROFILE_SUCCESS,
  payload: { data }
});

export const fetchProfileFail = (error:any) => ({
  type: UserType.FETCH_PROFILE_FAIL,
  payload: { error }
});
