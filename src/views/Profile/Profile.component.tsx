import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Link from "next/link";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IAuth, IUserState } from "src/interface";
import config from "../../../config";
import { formatDateTimeMilliseconds } from "../../common/utils";
import container from "./Profile.container";

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: 600,
    padding: "35px 0px",
    background: theme.palette.white,
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px 30px 0px",
    },
  },
  typography: {
    fontSize: 25,
    textTransform: "none",
  },
  alert: {
    fontSize: 16,
  },
  cardRoot: {
    marginTop: 16,
  },
  form: {},
  cardAction: {
    display: "flow-root",
    padding: "16px 0px 0px 0px",
  },
  submitBtn: {
    float: "right",
    color: "#ffffff",
    // marginBottom: 16,
    background: "rgb(1 60 108)",
    "&:hover": {
      background: "rgb(2 79 142)",
    },
  },
  subscribeBtn: {
    // color: '#4787ed',
    // textDecoration: 'none',
    // cursor: 'pointer',
    color: "#ffffff",
    background: "rgb(1 60 108)",
    "&:hover": {
      background: "rgb(2 79 142)",
    },
  },
  subscribeLink: {
    fontWeight: 500,
    color: "#4787ed",
    cursor: "pointer",
  },
  heading: {
    fontWeight: 400,
  },
  title: {
    color: "#b1acac",
    fontSize: 15,
  },
  link: {
    color: "#4787ed",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      color: "#154782",
    },
  },
  checked: {
    "&.Mui-checked": {
      color: "rgb(1 60 108)",
    },
  },
  disabledChecked: {
    "&.Mui-checked": {
      color: "rgb(204 204 204)",
    },
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
    [theme.breakpoints.between(1280, 1400)]: {
      maxWidth: "270px",
      marginLeft: "-460px",
      marginTop: 12,
    },
  },
}));

interface IProfileProps {
  auth: IAuth;
  userState: IUserState;
  onSetCheckedSMS: (value: boolean) => void;
  onSetCheckedEmail: (value: boolean) => void;
  onProfileSaveStart: (formData: any) => void;
  onCancelSubscription: () => void;
  onShowNotification: (status: string, message: string) => void;
  history: any;
}

const Profile = (props: IProfileProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    auth: {
      currentUser: { uid, email, username },
    },
    userState: {
      loading,
      profile: {
        firstname,
        lastname,
        contact,
        role,
        subscriptionId,
        smsAlert,
        emailAlert,
        subscription,
      },
      subscriptionLoading,
      isProfileUpdating,
    },
    onSetCheckedSMS,
    onSetCheckedEmail,
    onProfileSaveStart,
    onCancelSubscription,
    onShowNotification,
    history,
  } = props;
  const name = `${firstname} ${lastname}`;
  const [states, setStates] = React.useState(null);
  const [openSubscriptionCancel, setSubscriptionCancelOpen] =
    React.useState(false);
  const phoneCodeHandler = (phone: any) => {
    // console.log('phone: ', phone);
    setStates(phone);
  };
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const stripePromise = loadStripe(config?.stripe?.publicKey);
  const isSubscriber = subscription
    ? subscription.status !== "canceled" || role === "admin"
    : false;

  const onClickSubscribeHandler = async () => {
    let response = null;
    localStorage.removeItem("auth::register");
    // Get Stripe.js instance
    const stripe = await stripePromise;
    const priceId = config?.stripe?.priceId;

    if (!subscriptionId) {
      // Call your backend to create the Checkout Session
      const { data } = await axios.post(
        "https://nzkf6l88s4.execute-api.us-east-1.amazonaws.com/prod/create-checkout-session",
        {
          uid,
          firstname,
          email,
          priceId,
          type: "signup",
        }
      );
      // console.log({ data });
      response = data;
    } else {
      const { data } = await axios.post(
        "https://nzkf6l88s4.execute-api.us-east-1.amazonaws.com/prod/create-subscription-session",
        {
          uid,
          firstname,
          email,
          priceId,
          type: "subscribe",
        }
      );
      // console.log({ data });
      response = data;
    }
    if (stripe) {
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      });

      if (result && result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.error(result.error.message);
      }
    }
  };

  const onCancelSubscriptionHandler = () => {
    console.log("cancel subscription");
    setSubscriptionCancelOpen(false);
    onCancelSubscription();
  };

  const handleChangeSMS = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: any
  ) => {
    onSetCheckedSMS(!value);
    if (value) {
      onShowNotification("success", "SMS alert clear successfully.");
    } else {
      onShowNotification("success", "SMS alert set successfully.");
    }
  };
  const handleChangeEmail = (event: any, value: any) => {
    onSetCheckedEmail(!value);
    if (value) {
      onShowNotification("success", "Email alert clear successfully.");
    } else {
      onShowNotification("success", "Email alert set successfully.");
    }
  };

  const handleClickOpenSubscriptionCancel = (e: any) => {
    setSubscriptionCancelOpen(true);
  };

  const handleCloseSubscriptionCancel = () => {
    setSubscriptionCancelOpen(false);
  };

  const handleFormSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const submitObject = {
      phone: states || contact || "",
      // smsAlert: profile.smsAlert,
      // emailAlert: profile.emailAlert
    };
    // console.log('clicked handleFormSubmit: ', submitObject);
    // setSubmitBtn(true);
    if (isProfileUpdating || states !== contact) {
      onProfileSaveStart(submitObject);
    } else {
      onShowNotification(
        "error",
        "No changes found to save. Please check and try again."
      );
    }
  };

  return (
    <div className={classes.root}>
      {!isSubscriber && (
        <Container style={{ maxWidth: 1400 }}>
          <Alert severity="error" className={classes.alert}>
            Your account is limited, please&nbsp;
            <span
              className={classes.subscribeLink}
              onClick={onClickSubscribeHandler}
            >
              SUBSCRIBE
            </span>
            &nbsp; to get premium SPAC features and alerts.
          </Alert>
        </Container>
      )}
      <Container style={{ maxWidth: 1400 }}>
        <Grid style={{ margin: "2% 0" }}>
          <Typography
            component="span"
            gutterBottom
            className={classes.typography}
          >
            Profile
          </Typography>
          <Card className={classes.cardRoot}>
            <CardHeader
              title="Account"
              classes={{
                title: classes.heading,
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Grid item xs={12} sm={6}>
                    <Typography component="span" className={classes.title}>
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="span">{name || ""}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid item xs={12} sm={6}>
                    <Typography component="span" className={classes.title}>
                      Password&nbsp;
                      <Link href={"/change-password"}>
                        <Typography className={classes.link}>Change</Typography>
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="span">*******</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <Divider light />
            <CardHeader
              title="Contact Details"
              classes={{
                title: classes.heading,
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    placeholder="Enter Email Address"
                    disabled
                    value={username || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PhoneInput
                    country="us"
                    value={contact || states}
                    onChange={(phone) => phoneCodeHandler(phone)}
                    inputProps={{
                      name: "phone",
                      // required: true,
                      autoFocus: true,
                    }}
                    containerClass="my-container-class"
                    inputClass="my-input-class"
                    inputStyle={{
                      // background: 'lightblue',
                      height: 55,
                      width: "100%",
                    }}
                  />
                </Grid>
              </Grid>
              <CardActions disableSpacing className={classes.cardAction}>
                <Button
                  type="submit"
                  fullWidth={matchesXS}
                  variant="contained"
                  color="default"
                  disabled={loading}
                  className={classes.submitBtn}
                  onClick={handleFormSubmit}
                >
                  {loading ? "Loading..." : "Save"}
                </Button>
              </CardActions>
            </CardContent>
            <Divider light />
            <CardHeader
              title="Premium Notification Preferences"
              classes={{
                title: classes.heading,
              }}
            />
            <CardContent className={classes.notifications}>
              <Grid container>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Typography component="span">SMS Alerts</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    {!contact ? (
                      <Tooltip title="Update contact detail to check/uncheck">
                        <Checkbox
                          className={classes.disabledChecked}
                          checked={smsAlert}
                          color="default"
                          inputProps={{ "aria-label": "sms-alert-checkbox" }}
                          disabled={!isSubscriber}
                        />
                      </Tooltip>
                    ) : (
                      <Checkbox
                        className={classes.checked}
                        checked={smsAlert}
                        // onChange={handleChangeSMS}
                        color="primary"
                        onClick={(e) => handleChangeSMS(e, smsAlert)}
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
                      className={classes.checked}
                      checked={emailAlert}
                      // onChange={handleChangeEmail}
                      color="primary"
                      onClick={(e) => handleChangeEmail(e, emailAlert)}
                      inputProps={{ "aria-label": "email-alert-checkbox" }}
                      disabled={!isSubscriber}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={classes.messages}>
                <b>
                  By checking here, I agree to receive SMS or email alerts.
                  &nbsp;Uncheck to stop receiving SMS or email alerts.
                </b>
              </Grid>
            </CardContent>
            <Divider light />
            <CardHeader
              title="Subscription"
              classes={{
                title: classes.heading,
              }}
            />
            <CardContent>
              {isSubscriber && !subscriptionLoading ? (
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Grid item xs={12} sm={6}>
                        <Typography component="span" className={classes.title}>
                          Payment Status
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          component="span"
                          style={{ textTransform: "capitalize" }}
                        >
                          {subscription?.status}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Grid item xs={12} sm={6}>
                        <Typography component="span" className={classes.title}>
                          Start From
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography component="span">
                          {formatDateTimeMilliseconds(
                            subscription?.current_period_start
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Grid item xs={12} sm={6}>
                        <Typography component="span" className={classes.title}>
                          Valid Until
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography component="span">
                          {formatDateTimeMilliseconds(
                            subscription?.current_period_end
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Grid item xs={12} sm={6}>
                        <Typography component="span" className={classes.title}>
                          Quantity
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography component="span">
                          {subscription?.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      {subscription?.status === "canceled" &&
                      role === "admin" ? (
                        <Button
                          type="button"
                          variant="contained"
                          color="default"
                          fullWidth={matchesXS}
                          disabled={subscriptionLoading}
                          className={classes.subscribeBtn}
                          onClick={onClickSubscribeHandler}
                        >
                          {subscriptionLoading ? "Loading..." : "Subscribe"}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="contained"
                          color="default"
                          fullWidth={matchesXS}
                          disabled={subscriptionLoading}
                          className={classes.subscribeBtn}
                          onClick={handleClickOpenSubscriptionCancel}
                        >
                          {subscriptionLoading
                            ? "Loading..."
                            : "Cancel Subscription"}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  color="default"
                  fullWidth={matchesXS}
                  disabled={subscriptionLoading}
                  className={classes.subscribeBtn}
                  onClick={onClickSubscribeHandler}
                >
                  {subscriptionLoading ? "Loading..." : "Subscribe"}
                </Button>
              )}
            </CardContent>
          </Card>
          <Dialog
            open={openSubscriptionCancel}
            fullWidth
            maxWidth="sm"
            onClose={handleCloseSubscriptionCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              style={{ textAlign: "center" }}
            >
              Are you sure you want to cancel subscription?
            </DialogTitle>
            <DialogActions
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={handleCloseSubscriptionCancel}
                variant="contained"
                color="default"
                className={classes.submitBtn}
              >
                Close
              </Button>
              <Button
                onClick={onCancelSubscriptionHandler}
                variant="contained"
                color="default"
                className={classes.submitBtn}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Container>
    </div>
  );
};

export default container(Profile);
