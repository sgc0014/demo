import { signoutStart } from '@store/auth/auth.actions';
import { toggleSidebar } from '@store/siteCoordinator/siteCoordinator.actions';
import { connect } from 'react-redux';
import { RootState } from 'src/store';


const mapStateToProps = (state:RootState) => ({
  authState: state.auth,
  userState: state.user,
  siteCoordinator: state.siteCoordinator,
});

const mapDispatchToProps = (dispatch:any) => ({
  onSignoutStart: () => dispatch(signoutStart()),
  onToggleSidebar: (value:boolean) => dispatch(toggleSidebar(value)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
