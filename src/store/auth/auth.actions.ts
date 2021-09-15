import * as AuthType from './auth.types';

export const loadUserStart = () => ({
  type: AuthType.LOAD_USER_START
});

export const loadUserSuccess = (currentUser:any) => ({
  type: AuthType.LOAD_USER_SUCCESS,
  payload: currentUser
});

export const loadUserFail = (error:any) => ({
  type: AuthType.LOAD_USER_FAILURE,
  payload: error
});

export const prefetchUserContact = (contact:any) => ({
  type: AuthType.PREFETCH_USER_CONTACT,
  payload: { contact }
});

export const loadUserFinally = () => ({
  type: AuthType.LOAD_USER_FINALLY,
  payload: { }
});

export const signinStart = (formData:any, history:any) => ({
  type: AuthType.SIGN_IN_START,
  payload: { formData, history }
});

export const signinSuccess = (currentUser:any) => ({
  type: AuthType.SIGN_IN_SUCCESS,
  payload: currentUser
});

export const signinFail = (error:any) => ({
  type: AuthType.SIGN_IN_FAILURE,
  payload: error
});

export const signupStart = (formData:any, history:any) => ({
  type: AuthType.SIGN_UP_START,
  payload: { formData, history }
});

export const signupSuccess = () => ({
  type: AuthType.SIGN_UP_SUCCESS
});

export const signupFail = (error:any) => ({
  type: AuthType.SIGN_UP_FAILURE,
  payload: error
});

export const signupPaymentStart = (formData:any, histor:any, stripe:any, element:any) => ({
  type: AuthType.SIGN_UP_PAYMENT_START,
  payload: { formData, history, stripe, element }
});

export const signupPaymentSuccess = (user:any) => ({
  type: AuthType.SIGN_UP_PAYMENT_SUCCESS,
  payload: user
});

export const signupPaymentFail = (error:any) => ({
  type: AuthType.SIGN_UP_PAYMENT_FAILURE,
  payload: error
});

export const signoutStart = () => ({
  type: AuthType.SIGN_OUT_START
});

export const signoutSuccess = () => ({
  type: AuthType.SIGN_OUT_SUCCESS
});

export const signoutFail = (error:any) => ({
  type: AuthType.SIGN_OUT_FAILURE,
  payload: error
});

export const createCheckoutSession = () => ({
  type: AuthType.CREATE_CHECKOUT_SESSION_START,
  payload: { }
});
