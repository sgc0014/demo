import * as AdminType from './admin.types';

const INITIAL_STATE = {
  loading: false,
  users: {},
  counts: {},
  errors: {}
};

const adminReducer = (state = INITIAL_STATE, action:any) => {
  const { type, payload } = action;
  let updatedState:any = {};
  switch (type) {
    case AdminType.FETCH_USER_START:
      return {
        ...state,
        loading: true,
      };

    case AdminType.FETCH_USER_SUCCESS:
      updatedState = {
        ...state,
        users: {
          ...state.users,
        }
      };
      updatedState.loading = false;
      payload.data.forEach((meta:any) => {
        updatedState.users[meta.id] = meta;
      });
      updatedState.counts = payload.userCount;
      return updatedState;

    case AdminType.FETCH_USER_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload.error,
      };

    default:
      return state;
  }
};

export default adminReducer;
