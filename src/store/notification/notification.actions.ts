import * as NotificationTypes from './notification.types';

export const showSnackbarNotification = (status:any, message:any) => ({
  type: NotificationTypes.SHOW_SNACKBAR_NOTIFICATION,
  payload: { status, message },
});

export const hideSnackbarNotification = () => ({
  type: NotificationTypes.HIDE_SNACKBAR_NOTIFICATION,
});
