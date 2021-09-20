import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import {
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import {
  fetchProfileStart,
  setCheckedEmail,
  setCheckedSMS,
} from "src/store/user/user.actions";
import { showSnackbarNotification } from "src/store/notification/notification.actions";
import { IUserState } from "src/interface";
import { RootState } from "src/store/";

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: 700,
    padding: "35px 0px",
    background: theme.palette.white,
    [theme.breakpoints.down("sm")]: {
      padding: "100px 0px 30px 0px",
    },
  },
  mainBg: {
    maxWidth: 600,
    padding: "10px 20px 80px",
    boxShadow: "0 0 20px rgba(0,0,0,0.2);",
    borderRadius: "15px",
    marginTop: "180px",
    [theme.breakpoints.only("lg")]: {
      marginTop: 105,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 22,
      borderRadius: 0,
      boxShadow: "0 0 0px rgba(0,0,0,0.2);",
    },
  },
  heading: {
    fontWeight: 400,
  },
  notifications: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  messages: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "270px",
      marginLeft: "-510px",
      marginTop: 12,
    },
    [theme.breakpoints.between("1280", "1400")]: {
      maxWidth: "270px",
      marginLeft: "-460px",
      marginTop: 12,
    },
  },
  button: {
    marginTop: 50,
    marginBottom: 20,
  },
}));

interface INotificationProps {
  user: IUserState;
  onFetchProfileStart: (userid: string) => void;
  onSetCheckedEmail: (value: boolean) => void;
  onSetCheckedSMS: (value: boolean) => void;
  onShowNotification: (status: string, message: string) => void;
}
const NotificationPreferences = (props: INotificationProps) => {
  const classes = useStyles();
  const {
    user: { loading, profile },
    onFetchProfileStart,
    onSetCheckedEmail,
    onSetCheckedSMS,
    onShowNotification,
  } = props;
  const isSubscriber = profile?.subscription
    ? profile?.subscription?.status !== "canceled"
    : false;
  let userid = document.location.pathname.split("/").slice(2, 3).toString();
  React.useEffect(() => {
    if (!profile || profile?.id !== userid) {
      onFetchProfileStart(userid);
    }
  }, []);

  const handleChangeEmail = (event: any, value: any) => {
    onSetCheckedEmail(!value);
    if (value) {
      onShowNotification("success", "Email alert clear successfully.");
    } else {
      onShowNotification("success", "Email alert set successfully.");
    }
  };

  const handleChangeSMS = (event: any, value: any) => {
    onSetCheckedSMS(!value);
    if (value) {
      onShowNotification("success", "SMS alert clear successfully.");
    } else {
      onShowNotification("success", "SMS alert set successfully.");
    }
  };

  return (
    <div className={classes.root}>
      {!loading && !profile?.id && (
        <Container className={classes.mainBg}>
          <Grid style={{ margin: "2% 0", textAlign: "center" }}>
            <Typography component="h1" variant="h1">
              404
            </Typography>
            <Typography component="h3" variant="h3">
              USER NOT FOUND
            </Typography>
            <Typography variant="body1">
              User not found. Please check your mail and try to unsubscribe
              again.
            </Typography>
            <Link href="/">
              <Button variant="outlined" className={classes.button}>
                Homepage
              </Button>
            </Link>
          </Grid>
        </Container>
      )}
      {profile?.id && (
        <Container className={classes.mainBg}>
          <Grid style={{ margin: "2% 0" }}>
            <CardHeader
              title="Premium Notification Preferences"
              classes={{
                title: classes.heading,
              }}
            />
            <CardContent>
              <Grid container>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Typography component="span">SMS Alerts</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    {!profile?.contact ? (
                      <Tooltip title="Update contact detail to check/uncheck">
                        <Checkbox
                          checked={profile?.smsAlert}
                          color="default"
                          inputProps={{ "aria-label": "sms-alert-checkbox" }}
                          disabled={!isSubscriber}
                        />
                      </Tooltip>
                    ) : (
                      <Checkbox
                        checked={profile?.smsAlert}
                        // onChange={handleChangeSMS}
                        color="primary"
                        onClick={(e) => handleChangeSMS(e, profile?.smsAlert)}
                        inputProps={{ "aria-label": "sms-alert-checkbox" }}
                        disabled={!isSubscriber}
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Typography component="span">Email Alerts</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Checkbox
                      checked={profile?.emailAlert}
                      color="primary"
                      onClick={(e) => handleChangeEmail(e, profile?.emailAlert)}
                      inputProps={{ "aria-label": "email-alert-checkbox" }}
                      disabled={!isSubscriber}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <b>
                  By checking here, I agree to receive SMS or email alerts.
                  &nbsp;Uncheck to stop receiving SMS or email alerts.
                </b>
              </Grid>
            </CardContent>
          </Grid>
        </Container>
      )}
    </div>
  );
};

NotificationPreferences.propTypes = {
  onFetchProfileStart: PropTypes.func.isRequired,
  onSetCheckedEmail: PropTypes.func.isRequired,
  onSetCheckedSMS: PropTypes.func.isRequired,
  onShowNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchProfileStart: (userid: string) => dispatch(fetchProfileStart(userid)),
  onSetCheckedEmail: (value: boolean) => dispatch(setCheckedEmail(value)),
  onSetCheckedSMS: (value: boolean) => dispatch(setCheckedSMS(value)),
  onShowNotification: (status: string, message: string) =>
    dispatch(showSnackbarNotification(status, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationPreferences);
