import { connect } from 'react-redux';
import {
  setSPACEmailAlertStart,
  setSPACSMSAlertStart,
  unFollowStart
} from 'src/store/userHistory/userHistory.actions';
import { showSnackbarNotification } from 'src/store/notification/notification.actions';
import { RootState } from 'src/store/';

const mapStateToProps = (state:RootState) => ({
  userState: state.user,
  userHistoryState: state.userHistory,
});

const mapDispatchToProps = (dispatch:any) => ({
  onSPACEmailAlertStart: (value:string, emailAlert:any) => dispatch(setSPACEmailAlertStart(value, emailAlert)),
  onSPACSMSAlertStart: (value:string, smsAlert:any) => dispatch(setSPACSMSAlertStart(value, smsAlert)),
  onHandleUnFollow: (value:string) => dispatch(unFollowStart(value)),
  onShowNotification: (status:string, message:string) => dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
