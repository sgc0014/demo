/* eslint-disable implicit-arrow-linebreak */
import { connect } from "react-redux";

import { signupStart } from "src/store/auth/auth.actions";
import {
  subscribeUser,
  sendStripePaymentEmail,
} from "src/store/user/user.actions";
import { RootState } from "src/store/";

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  userstate: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSignupStart: (formData: any, history: any) =>
    dispatch(signupStart(formData, history)),
  onSubscribeUser: (subscriptionId: string) =>
    dispatch(subscribeUser(subscriptionId)),
  onSendStripePaymentSuccessEmail: (
    paymentType: string,
    firstname: string,
    email: string
  ) => dispatch(sendStripePaymentEmail(paymentType, firstname, email)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
