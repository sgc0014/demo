import { takeLatest, call, put, all, select } from "redux-saga/effects";
import axios from "axios";
import { loadUserStart } from "../auth/auth.actions";
import { showSnackbarNotification } from "../notification/notification.actions";
import * as UserType from "./user.types";
import {
  profileSaveSuccess,
  profileSaveFail,
  fetchProfileSuccess,
  fetchProfileFail,
  cancelSubscriptionSuccess,
  cancelSubscriptionFail,
} from "./user.actions";
import { RootState } from "..";
import { IAuth,IUserState } from "src/interface/";

const getAuthState = (state: RootState) => state.auth;
const getUserState = (state: RootState) => state.user;


export function* fetchProfileAsync({ payload: { userid } }: any) {
  try {
    const { data } = yield axios.get(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/profile/fetch/${userid}`
    );
    console.log("profile: ", data);
    if (data.subscriptionStatus) {
      yield put(fetchProfileSuccess(data));
      console.log(" fetch profile success user-saga");
    } else {
      yield put(showSnackbarNotification("error", "User not found."));
      yield put(fetchProfileFail({ message: "User not found." }));
    }
    // yield put(fetchStripeDetailStart(data.subscriptionId));
  } catch (e:any) {
    console.error(e);
    yield put(fetchProfileFail(e));
  }
}

interface IStripePayload {
  payload: {
    subscriptionId: string;
  };
}
export function* fetchStripeAsync({
  payload: { subscriptionId },
}: IStripePayload) {
  try {
    const { data } = yield axios.get(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/stripe/fetch/${subscriptionId}`
    );
    console.log("data: ", data);
    // yield put(fetchStripeDetailSuccess(data));
  } catch (e) {
    console.error(e);
    // yield put(fetchStripeDetailFail(e.message));
  }
}


export function* profileSaveAsync({
  payload: { value },
}: any) {
  try {
   
    const authState: IAuth = yield select(getAuthState);
    const userid = authState.currentUser.uid;
    // console.log('userid: ', userid);
    const { data } = yield axios.post(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/profile/set/${userid}`,
      {
        phone: value.phone,
        // smsAlert: value.smsAlert,
        // emailAlert: value.emailAlert
      }
    );
    // console.log('data: ', data);
    if (data) {
      yield put(profileSaveSuccess(data));
      yield put(
        showSnackbarNotification(
          "success",
          "Contact detail saved successfully."
        )
      );
    } else {
      yield put(
        showSnackbarNotification(
          "error",
          "Error on save contact detail. Please try again."
        )
      );
    }
  } catch (e) {
    console.error("ERROR: ", e);
    yield put(profileSaveFail(e));
    yield put(
      showSnackbarNotification(
        "error",
        "Error on save contact detail. Please try again."
      )
    );
  }
}


export function* sendStripePaymentEmailAsync({
  payload: { paymentType, firstname, email },
}:any) {
  try {
    if (paymentType === "subscription") {
      yield axios.post(
        `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/send/stripeSubscriptionEmail`,
        {
          firstname,
          email,
        }
      );
    } else {
      yield axios.post(
        `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/send/stripePaymentEmail`,
        {
          firstname,
          email,
        }
      );
    }
  } catch (e) {
    console.error("ERROR: ", e);
  }
}


export function* setEmailSendStartAsync({ payload: { value } }:any) {
  try {
    const authState: IAuth = yield select(getAuthState);
    const userstate: IUserState = yield select(getUserState);
    // FOR CASE PREMIUM NOTIFICATION PREFERENCES WHERE NO AUTH AND USER IS SET
    const userid = authState?.currentUser?.uid || userstate?.profile?.id;
    const { data } = yield axios.post(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/profile/set/emailAlert/${userid}`,
      {
        emailAlert: value,
      }
    );
    console.log("data: ", data);
  } catch (e) {
    yield put(
      showSnackbarNotification(
        "error",
        "Error on set email alert. Please try again."
      )
    );
  }
}


export function* setSMSSendStartAsync({ payload: { value } }:any) {
  try {
    const authState: IAuth = yield select(getAuthState);
    const userstate: IUserState = yield select(getUserState);
    // FOR CASE PREMIUM NOTIFICATION PREFERENCES WHERE NO AUTH AND USER IS SET
    const userid = authState?.currentUser?.uid || userstate?.profile?.id;
    const { data } = yield axios.post(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/profile/set/smsAlert/${userid}`,
      {
        smsAlert: value,
      }
    );
    console.log("data: ", data);
  } catch (e) {
    yield put(
      showSnackbarNotification(
        "error",
        "Error on set sms alert. Please try again."
      )
    );
  }
}

export function* cancelSubscriptionAsync() {
  try {
    const authState:IAuth = yield select(getAuthState);
    const userstate: IUserState = yield select(getUserState);
    const {
      profile: { firstname, email },
    } = userstate;

    const { data } = yield axios.post(
      `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/subsctiption/cancel/${authState.currentUser?.uid}`,
      {
        subscriptionId: userstate.profile?.subscriptionId,
        firstname,
        email,
      }
    );
    console.log("cancel data: ", data);
    yield put(loadUserStart());
    yield put(cancelSubscriptionSuccess(data));
    yield put(
      showSnackbarNotification(
        "success",
        "Subscription cancelled successfully."
      )
    );
  } catch (e:any) {
    console.error(e);
    yield put(cancelSubscriptionFail(e));
    yield put(showSnackbarNotification("error", "Subscription cancel failed."));
  }
}

export function* profileSaveStartWatcher() {
  yield takeLatest(UserType.PROFILE_SAVE_START, profileSaveAsync);
}

export function* watchSendStripePaymentEmail() {
  yield takeLatest(
    UserType.SEND_STRIPE_PAYMENT_EMAIL,
    sendStripePaymentEmailAsync
  );
}

export function* watchSetEmailSendStart() {
  yield takeLatest(UserType.SET_EMAIL_SEND, setEmailSendStartAsync);
}

export function* watchSetSMSSendStart() {
  yield takeLatest(UserType.SET_SMS_SEND, setSMSSendStartAsync);
}

export function* fetchProfileWatcher() {
  yield takeLatest(UserType.FETCH_PROFILE_START, fetchProfileAsync);
}

export function* watchCancelSubscribeStart() {
  yield takeLatest(UserType.UN_SUBSCRIBE_START, cancelSubscriptionAsync);
}

export function* userSagas() {
  yield all([
    call(profileSaveStartWatcher),
    call(watchSendStripePaymentEmail),
    call(watchSetEmailSendStart),
    call(watchSetSMSSendStart),
    call(fetchProfileWatcher),
    call(watchCancelSubscribeStart),
  ]);
}
