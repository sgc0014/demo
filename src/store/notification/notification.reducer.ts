import * as NotificationType from "./notification.types";
import { Color } from "@material-ui/lab";
import { INotificationState } from "src/interface/";

const INITIAL_STATE: INotificationState = {
  snackbarNotification: {
    open: false,
    status: "success",
    message: "",
  },
};

const notificationReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  let updatedState;

  switch (type) {
    case NotificationType.SHOW_SNACKBAR_NOTIFICATION:
      updatedState = {
        ...state,
      };
      updatedState.snackbarNotification.open = true;
      updatedState.snackbarNotification.status = payload.status;
      updatedState.snackbarNotification.message = payload.message;
      return updatedState;

    case NotificationType.HIDE_SNACKBAR_NOTIFICATION:
      updatedState = {
        ...state,
      };
      state.snackbarNotification.open = false;
      return updatedState;

    default:
      return state;
  }
};

export default notificationReducer;
