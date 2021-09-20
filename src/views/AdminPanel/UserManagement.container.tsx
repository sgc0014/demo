/* eslint-disable implicit-arrow-linebreak */
import { RootState } from 'src/store/';
import { connect } from 'react-redux';
import { fetchUserStart, sendEmailStart, sendSMSStart } from 'src/store/admin/admin.actions';

const mapStateToProps = (state:RootState) => ({
  adminState: state.admin,
  authState:state.auth
});

const mapDispatchToProps = (dispatch:any) => ({
  onFetchUserStart: () => dispatch(fetchUserStart()),
  onSendEmail: (userid:string) => dispatch(sendEmailStart(userid)),
  onSendSMS: (userid:string) => dispatch(sendSMSStart(userid)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
