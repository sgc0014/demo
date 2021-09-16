import * as SiteTypes from './siteCoordinator.types';

const INITIAL_STATE = {
  sidebarOpen: false,
  loading: false,
  pathname: null
};

const siteCoordinatorReducer = (state = INITIAL_STATE, action:any) => {
  const { type, payload } = action;
  switch (type) {
    case SiteTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: payload,
      };

    case SiteTypes.CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: false,
      };

    case SiteTypes.SET_PATHNAME:
      return {
        ...state,
        pathname: payload
      };

    default:
      return state;
  }
};

export default siteCoordinatorReducer;
