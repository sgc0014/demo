/* eslint-disable implicit-arrow-linebreak */
import { RootState } from 'src/store';
import { connect } from 'react-redux';
import { signupStart } from 'src/store/auth/auth.actions';
import { showSnackbarNotification } from 'src/store/notification/notification.actions';
// import { setMessageOpen } from 'src/store/earlyAccess/earlyAccess.actions';

const mapStateToProps = (state:RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch:any) => ({
  onSignupStart: (formData:any, router:any) => dispatch(signupStart(formData, router)),
  onShowNotification: (status:any, message:any) => dispatch(showSnackbarNotification(status, message)),
  // onSetMessageOpen: (status, title, message) => dispatch(setMessageOpen(status, title, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
