/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';
import { followStart, unFollowStart } from 'src/store/userHistory/userHistory.actions';
import { showSnackbarNotification } from 'src/store/notification/notification.actions';
import { fetchHistoricalStart } from 'src/store/spacrun/spacrun.actions';

const mapStateToProps = (state) => ({
  authState: state.auth,
  userHistoryState: state.userHistory,
  spacrunState: state.spacrun
});

const mapDispatchToProps = (dispatch) => ({
  onFollow: (value) => dispatch(followStart(value)),
  onUnFollow: (value) => dispatch(unFollowStart(value)),
  onFetchHistoricalStart: (symbol) => dispatch(fetchHistoricalStart(symbol)),
  onShowNotification: (status, message) => dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
