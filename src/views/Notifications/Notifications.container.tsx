import { RootState } from 'src/store/';
import { connect } from 'react-redux';
import { hideSnackbarNotification } from 'src/store/notification/notification.actions';

const mapStateToProps = (state:RootState) => ({
  notificationState: state.notification,
});

const mapDispatchToProps = (dispatch:any) => ({
  onHideSnackbarNotification: () => dispatch(hideSnackbarNotification()),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
