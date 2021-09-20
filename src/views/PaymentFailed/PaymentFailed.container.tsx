/* eslint-disable implicit-arrow-linebreak */
import { RootState } from "src/store/";
import { connect } from "react-redux";

import { signupStart } from "src/store/auth/auth.actions";

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSignupStart: (formData: any, history: any) =>
    dispatch(signupStart(formData, history)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
