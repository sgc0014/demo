import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios,{AxiosResponse} from 'axios';
import * as EarlyAccessType from './earlyAccess.types';
import * as EarlyAccessActions from './earlyAccess.actions';
import { showSnackbarNotification } from '../notification/notification.actions';

export function* earlyAccessAsync({ payload: { email } }:any) {
  try {
    const { data }:AxiosResponse = yield axios.post(
      'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/access',
      {
        email
      }
    );
    const item = {
      message:''
    };
    if (data.already) {
      item.message = 'You already joined the waitlist for exclusive early access and will receive an email once its your turn to sign up for the 7 day free trial.';
      yield put(showSnackbarNotification('success', 'You already joined the waitlist.'));
    } else {
      item.message = 'Congratulations, you have joined the waitlist for exclusive early access and will receive an email once its your turn to sign up for the 7 day free trial.';
      yield put(showSnackbarNotification('success', 'Early access completed successfully.'));
    }
    yield put(EarlyAccessActions.earlyAccessSuccess(item));
  } catch (error:any) {
    console.error(error);
    yield put(showSnackbarNotification('error', error.message));
    yield put(EarlyAccessActions.earlyAccessFail(error));
  }
}

export function* watchEarlyAccess() {
  yield takeLatest(EarlyAccessType.EARLY_ACCESS_START, earlyAccessAsync);
}

export function* earlyAccessSagas() {
  yield all([
    call(watchEarlyAccess)
  ]);
}
