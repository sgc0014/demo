/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';

// import { searchStart } from 'src/store/search/search.actions';
// import { showSnackbarNotification } from 'src/store/notification/notification.actions';
import { RootState } from '../../../../../../store';

type DispatchSearchStart = (value:any,history:any) => () => void
const mapStateToProps = (state:RootState) => ({
  // searchState: state.search,
  spacrunState: state.spacrun,
});

const mapDispatchToProps = (dispatch:any) => ({
  // onSearchStart: (value, history) => dispatch(searchStart(value, history)),
  // onShowNotification: (status, message) => dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
