import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import container from "./Notifications.container";
import { INotificationState } from "src/interface/";
import { Color } from "@material-ui/lab";

interface INotificationProps {
  notificationState: INotificationState;
  onHideSnackbarNotification: () => void;
}
const Alert = (props: {
  onClose: () => void;
  severity: Color | undefined;
  children: React.ReactNode;
}) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notification: React.FC<INotificationProps> = (props) => {
  const {
    notificationState: {
      snackbarNotification: { open, status, message },
    },
    onHideSnackbarNotification,
  } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onHideSnackbarNotification}
    >
      <Alert onClose={onHideSnackbarNotification} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default container(Notification);
