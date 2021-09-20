/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';
import {
  setCheckedSMS,
  setCheckedEmail,
  profileSaveStart,
  cancelSubscription,
} from 'src/store/user/user.actions';
import { showSnackbarNotification } from 'src/store/notification/notification.actions';
import { RootState } from 'src/store/';
// import { createCheckoutSession } from 'src/store/auth/auth.actions';

const mapStateToProps = (state:RootState) => ({
  auth: state.auth,
  userState: state.user,
});

const mapDispatchToProps = (dispatch:any) => ({
  onSetCheckedSMS: (value:boolean) => dispatch(setCheckedSMS(value)),
  onSetCheckedEmail: (value:boolean) => dispatch(setCheckedEmail(value)),
  onProfileSaveStart: (formData:any) => dispatch(profileSaveStart(formData)),
  // onCreateCheckoutSession: () => dispatch(createCheckoutSession()),
  onCancelSubscription: () => dispatch(cancelSubscription()),
  onShowNotification: (status:string, message:string) => dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
