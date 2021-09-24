import { HYDRATE } from "next-redux-wrapper";
import { IAuth } from "src/interface";
import * as AuthType from "./auth.types";

const INITIAL_STATE = {
  isAuthenticated: false,
  currentUser: {},
  newUser: {},
  error: null,
  loading: true,
};

const authReducer = (state: IAuth = INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  let updatedState = null;
  switch (type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }
    
    case AuthType.SIGN_IN_START:
    case AuthType.SIGN_UP_START:
    case AuthType.LOAD_USER_START:
      return {
        ...state,
        loading: true,
      };

    case AuthType.SIGN_IN_SUCCESS:
    case AuthType.LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: payload,
        loading: false,
      };

    case AuthType.PREFETCH_USER_CONTACT:
      updatedState = {
        ...state,
      };
      updatedState.currentUser = {
        ...updatedState.currentUser,
        contact: payload.contact,
      };
      return updatedState;

    case AuthType.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case AuthType.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: null,
        currentUser: {},
        error: null,
      };

    case AuthType.LOAD_USER_FAILURE:
    case AuthType.SIGN_IN_FAILURE:
    case AuthType.SIGN_UP_FAILURE:
    case AuthType.SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case AuthType.LOAD_USER_FINALLY:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
