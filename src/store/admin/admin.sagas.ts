import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import axios from 'axios';
import { showSnackbarNotification } from '../notification/notification.actions';
import * as AdminType from './admin.types';
import * as AdminAction from './admin.actions';
import { RootState } from '..';
import { IAuth } from 'src/interface';

const getAuthState = (state:RootState) => state.auth;
const getAdminState = (state:RootState) => state.admin;

export function* fetchUserAsync() {
  try {
    const authState:IAuth = yield select(getAuthState);
    const userid = authState.currentUser.uid;
   
    if (userid) {
      const { data } = yield axios.get(
        'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/user/list'
      );
      const total = data.length;
      let subscribed = 0;
      let verified = 0;
      // eslint-disable-next-line array-callback-return
      data.map((item:any) => {
        if (item.subscriptionId && item.subscriptionStatus === 'active') {
          // eslint-disable-next-line no-unused-vars
          subscribed++;
        }
        if (item.verified) {
          verified++;
        }
      });
      const userObject = {
        total,
        verified,
        subscribed
      };
      yield put(AdminAction.fetchUserSuccess(data, userObject));
    } else {
      console.log('user not authorized to get user details.');
    }
  } catch (e) {
    console.error(e);
    yield put(AdminAction.fetchUserFail(e));
  }
}

export function* sendEmailAsync({ payload: { userid } }:any) {
  console.log('userid', userid);
  try {
    const { users } = yield select(getAdminState);
    const userObject = users[userid];
    if (userid && userObject.subscriptionId) {
      if (userObject.emailAlert === 'true') {
        yield axios.post(
          `https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/user/send-email/${userid}`,
          {
            firstname: userObject.firstname,
            email: userObject.email
          }
        );
        yield put(
          showSnackbarNotification('success', 'Email sent successfully.')
        );
      } else {
        yield put(
          showSnackbarNotification('error', 'User disabled email notification.')
        );
      }
    } else {
      console.log('User not subscribed.');
      yield put(showSnackbarNotification('error', 'User not subscribed.'));
    }
  } catch (e:any) {
    console.error(e);
    yield put(showSnackbarNotification('error', e.message));
  }
}

export function* sendSMSAsync({ payload: { userid } }:any) {
  console.log('userid', userid);
  try {
    const { users } = yield select(getAdminState);
    const userObject = users[userid];
    if (userid && userObject.subscriptionId) {
      if (userObject.smsAlert === 'true') {
        if (userObject.phone) {
          const { data } = yield axios.post(
            'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/user/send-sms',
            {
              firstname: userObject.firstname,
              phoneNumber: userObject.phone
            }
          );
          console.log('result: ', data);
          if (data) {
            yield put(
              showSnackbarNotification('success', 'SMS sent successfully.')
            );
          }
        } else {
          yield put(
            showSnackbarNotification(
              'error',
              'User phone number not set to send SMS notification.'
            )
          );
        }
      } else {
        yield put(
          showSnackbarNotification('error', 'User disabled SMS notification.')
        );
      }
    } else {
      console.log('User not subscribed.');
      yield put(showSnackbarNotification('error', 'User not subscribed.'));
    }
  } catch (e:any) {
    console.error(e);
    yield put(showSnackbarNotification('error', e.message));
  }
}

export function* watchFetchUser() {
  yield takeLatest(AdminType.FETCH_USER_START, fetchUserAsync);
}

export function* watchSendEmail() {
  yield takeLatest(AdminType.SEND_EMAIL_START, sendEmailAsync);
}

export function* watchSendSMS() {
  yield takeLatest(AdminType.SEND_SMS_START, sendSMSAsync);
}

export function* adminSagas() {
  yield all([call(watchFetchUser), call(watchSendEmail), call(watchSendSMS)]);
}
