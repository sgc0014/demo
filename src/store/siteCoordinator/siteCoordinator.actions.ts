import * as SiteTypes from './siteCoordinator.types';

export const toggleSidebar = (value:any) => ({
  type: SiteTypes.TOGGLE_SIDEBAR,
  payload: value
});

export const closeSidebar = () => ({
  type: SiteTypes.CLOSE_SIDEBAR,
});

export const setPathname = (pathname:any) => ({
  type: SiteTypes.SET_PATHNAME,
  payload: pathname
});
