import { connect } from 'react-redux';
// import { toggleSidebar } from 'src/store/siteCoordinator/siteCoordinator.actions';
import { RootState } from '../../store';
import { signoutStart } from '../../store/auth/auth.actions';

const mapStateToProps = (state:RootState) => ({
  authState: state.auth,
  // userState: state.user,
  // siteCoordinator: state.siteCoordinator,
});

const mapDispatchToProps = (dispatch:any) => ({
  onSignoutStart: () => dispatch(signoutStart()),
  // onToggleSidebar: (value:boolean) => dispatch(toggleSidebar(value)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
