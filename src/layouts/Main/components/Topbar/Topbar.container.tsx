/* eslint-disable implicit-arrow-linebreak */
import { signoutStart } from '@store/auth/auth.actions';
import { connect } from 'react-redux';
// import { setDialogOpen } from 'src/store/earlyAccess/earlyAccess.actions';

const mapStateToProps = (state:any) => ({
  auth: state.auth,
  // userState: state.user,
});

const mapDispatchToProps = (dispatch:any) => ({
  onSignoutStart: () => dispatch(signoutStart()),
  // onSetDialogOpen: (value) => dispatch(setDialogOpen(value)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
