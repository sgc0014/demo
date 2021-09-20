/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';

import { signupStart } from 'src/store/auth/auth.actions';
import { subscribeUser, sendStripePaymentEmail } from 'src/store/user/user.actions';

const mapStateToProps = (state) => ({
  auth: state.auth,
  userState: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  onSignupStart: (formData, history) =>
    dispatch(signupStart(formData, history)),
  onSubscribeUser: (subscriptionId) => dispatch(subscribeUser(subscriptionId)),
  onSendStripePaymentSuccessEmail: (paymentType, firstname, email) => dispatch(sendStripePaymentEmail(paymentType, firstname, email)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
