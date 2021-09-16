/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';
import { setDialogOpen, setMessageOpen, earlyAccessStart } from '@store/earlyAccess/earlyAccess.actions';

const mapStateToProps = (state) => ({
    earlyAccessState: state.earlyAccess,
});

const mapDispatchToProps = (dispatch) => ({
  onSetDialogOpen: (value) => dispatch(setDialogOpen(value)),
  onSetMessageOpen: (value, title, message) => dispatch(setMessageOpen(value, title, message)),
  onEarlyAccess: (email) => dispatch(earlyAccessStart(email))
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
