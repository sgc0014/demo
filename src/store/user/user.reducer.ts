import * as UserType from './user.types';

const INITIAL_STATE = {
  loading: false,
  subscriptionLoading: false,
  profile: {
    smsAlert: false,
    emailAlert: false,
    avatarUrl: null,
    // isSubscriber: false,
  },
  isProfileUpdating: false,
  errors: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  let updatedState = {};
  switch (type) {
    case UserType.SET_SMS_SEND:
      updatedState = {
        ...state,
      };
      updatedState.profile.smsAlert = payload.value;
      updatedState.isProfileUpdating = true;
      return updatedState;

    case UserType.SET_EMAIL_SEND:
      updatedState = {
        ...state,
      };
      updatedState.profile.emailAlert = payload.value;
      updatedState.isProfileUpdating = true;
      return updatedState;

    case UserType.PROFILE_SAVE_START:
      return {
        ...state,
        loading: true,
        isProfileUpdating: false,
      };

    case UserType.PROFILE_SAVE_SUCCESS:
      updatedState = {
        ...state,
        loading: false,
      };
      updatedState.profile.contact = payload.data.phone;
      return updatedState;

    case UserType.PROFILE_SAVE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload.err,
      };

    case UserType.SUBSCRIBE_USER_START:
      return {
        ...state,
        subscriptionLoading: true,
      };

    case UserType.UN_SUBSCRIBE_START:
      return {
        ...state,
        subscriptionLoading: true,
        profile: {
          ...state.profile,
          // isSubscriber: false
        }
      };

    case UserType.SUBSCRIBE_USER_SUCCESS:
    case UserType.SUBSCRIBE_USER_FAIL:
    case UserType.UN_SUBSCRIBE_FAIL:
      return {
        ...state,
        subscriptionLoading: false,
      };

    case UserType.UN_SUBSCRIBE_SUCCESS:
      updatedState = {
        ...state,
        subscriptionLoading: false,
      };
      updatedState.profile.subscription = payload.data.subscription;
      return updatedState;

    case UserType.FETCH_PROFILE_START:
      return {
        ...state,
        loading: true,
      };

    case UserType.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: {
          ...payload.data,
          contact: payload.data.phone,
          isAdmin: payload.data.role === 'admin',
          avatarUrl: payload.data.firstname.charAt(0),
          // isSubscriber: !!payload.data.subscription,
        }
      };

    case UserType.FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload.error
      };

    default:
      return state;
  }
};

export default userReducer;
