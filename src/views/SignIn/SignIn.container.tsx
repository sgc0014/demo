/* eslint-disable implicit-arrow-linebreak */
import { RootState } from '../../store';
import { connect } from 'react-redux';
import { signinStart } from 'src/store/auth/auth.actions';
import { showSnackbarNotification } from 'src/store/notification/notification.actions';
import { IUserData } from 'src/interface/';

const mapStateToProps = (state:RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch:any) => ({
  onSigninStart: (formData:IUserData, router:any) => dispatch(signinStart(formData, router)),
  onShowNotification: (status:string, message:string) => dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
