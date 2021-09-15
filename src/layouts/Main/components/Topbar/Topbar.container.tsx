/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';
// import { setDialogOpen } from 'src/store/earlyAccess/earlyAccess.actions';
import { RootState } from '../../../../store';
import { signoutStart } from '../../../../store/auth/auth.actions';

const mapStateToProps = (state:RootState) => ({
  auth: state.auth,
  // userState: state.user,
});

const mapDispatchToProps = (dispatch:any) => ({
  onSignoutStart: () => dispatch(signoutStart()),
  // onSetDialogOpen: (value) => dispatch(setDialogOpen(value)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
