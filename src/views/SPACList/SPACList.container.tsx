import { connect } from 'react-redux';
import { followStart, unFollowStart } from 'src/store/userHistory/userHistory.actions';
import { showSnackbarNotification } from 'src/store/notification/notification.actions';
import { RootState } from 'src/store/';

const mapStateToProps = (state:RootState) => ({
  authState: state.auth,
  followState: state.userHistory,
  spacrunState: state.spacrun,
});

const mapDispatchToProps = (dispatch:any) => ({
  onFollow: (value:string) => dispatch(followStart(value)),
  onUnFollow: (value:string) => dispatch(unFollowStart(value)),
  onShowNotification: (status:string, message:string) => dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
