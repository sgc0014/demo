import React, { useEffect, useCallback } from "react";
import { Auth, Hub } from "aws-amplify";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import axios from "axios";
import config from "../../../config";
import container from "./SignUp.container";
import { CardContent } from "@material-ui/core";
import typography from "../../theme/typography";
import { IUserData } from "src/interface";


 interface ISignUpData {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  sessionId: string | string[] | undefined;
}
 interface ISignUpProps {
  onSignupStart: (data: ISignUpData, router: any) => void;
  onShowNotification: (status: string, message: string) => void;
  onSetMessageOpen?: (status: boolean, title: string, message: string) => void;
}
const useStyles = makeStyles((theme) =>
  createStyles({
    mainBg: {
      padding: "10px 20px 50px",
      boxShadow: "0 0 20px rgba(0,0,0,0.2);",
      borderRadius: "15px",
      marginTop: 50,
      marginBottom: 50,
      [theme.breakpoints.down("xs")]: {
        marginTop: -13,
        borderRadius: 0,
        maxWidth: "100%",
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "#013c6c",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      backgroundColor: "#013c6c",
      color: "#fff",
      margin: theme.spacing(3, 0, 2),
      "&:hover": {
        backgroundColor: "#024f8e",
      },
    },
    password: {
      color: "#111",
      textDecoration: "none",
    },
    signCL: {
      color: "#188EFB",
    },
    titleOne: {
      fontSize: 24,
      padding: 3,
    },
    titleTwo: {
      fontSize: 18,
      padding: 3,
    },
    cardPricing: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: "5px",
    },
    dltTitle: {
      position: "relative",
      fontSize: 30,
      "&:before": {
        content: '""',
        display: "block",
        width: "100%",
        borderTop: "3px solid red",
        height: "12px",
        position: "absolute",
        bottom: 5,
        left: 0,
        transform: "rotate(-40deg)",
      },
      "&:after": {
        content: '""',
        display: "block",
        width: "100%",
        borderTop: "3px solid red",
        height: "12px",
        position: "absolute",
        bottom: 15,
        right: 0,
        transform: "rotate(-140deg)",
      },
    },
    specialPrice: {
      textAlign: "center",
      fontWeight: 500,
      marginBottom: "15px",
      fontSize: 17,
    },
  })
);

const SignUp: React.FC<ISignUpProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { onSignupStart, onShowNotification, onSetMessageOpen } = props;
  const [signUpLoader, setSignUpLoader] = React.useState(false);
  const stripePromise = loadStripe(config?.stripe?.publicKey);
  const [earlyEmail, setEarlyEmail] = React.useState(null);

  const authStateChange = useCallback((accessToken) => {
    Hub.listen("auth", async ({ payload }) => {
      if (payload.event === "signUp") {
        let authRegister = localStorage.getItem("auth::register");
        const parsedData = authRegister && JSON.parse(authRegister);
        const { session_id: sessionId } = router.query;
        if (accessToken) {
          await confirmToken(parsedData.email, accessToken);
        }
        onSignupStart(
          {
            id: payload.data.userSub,
            name: parsedData.name,
            firstname: parsedData.firstname,
            lastname: parsedData.lastname,
            email: parsedData.email,
            sessionId,
          },
          router
        );
        // Get Stripe.js instance
        const stripe = await stripePromise;
        if (stripe) {
          const priceId = config.stripe.priceId;

          // Call your backend to create the Checkout Session
          const { data } = await axios.post(
            "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/create-checkout-session",
            {
              uid: payload.data.userSub,
              firstname: parsedData.firstname,
              email: parsedData.email,
              priceId,
              type: "signup",
            }
          );

          console.log({ data });

          // When the customer clicks on the button, redirect them to Checkout.
          const result = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
          });

          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.error(result.error.message);
          }
        }
      }
    });
  }, []);

  const checkToken = async (token: string) => {
    const { data } = await axios.post(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/access/token",
      {
        token,
      }
    );
    return data;
  };

  const confirmToken = async (email: string, token: string) => {
    const { data } = await axios.post(
      "https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/access/confirm",
      {
        email,
        token,
      }
    );
    console.log("confirmToken: ", data);
  };

  useEffect(() => {
    let accessToken = router.pathname.split("/").slice(2, 3).toString();
    console.log("accessToken: ", accessToken);
    if (accessToken) {
      checkToken(accessToken).then((r) => {
        // console.log('here: ', r);
        if (r?.data) {
          setEarlyEmail(r.data.email);
        } else if (!r?.status && r?.message === "invalid_token") {
          // console.log('Early access token is expired.');
          router.push(`/`);
          // onShowNotification('error', 'Early access has expired.  We will send another email if there is another opening.');
          onSetMessageOpen &&
            onSetMessageOpen(
              true,
              "Early Access Confirmation",
              "Early access has expired.  We will send another email if there is another opening."
            );
        } else {
          router.push(`/`);
          // onShowNotification('error', 'Early access has expired.  We will send another email if there is another opening.');
          onSetMessageOpen &&
            onSetMessageOpen(
              true,
              "Early Access Confirmation",
              "Early access has expired.  We will send another email if there is another opening."
            );
        }
      });
    }
    authStateChange(accessToken || "");
  }, []);

  const registerNewUser = async (values: IUserData) => {
    localStorage.setItem(
      "auth::register",
      JSON.stringify({
        email: values.email,
        name: `${values.firstname} ${values.lastname}`,
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.password,
      })
    );
    setSignUpLoader(true);
    // check user is registered or not
    try {
      await Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          email: values.email,
          name: values.name,
          given_name: values.firstname,
          family_name: values.lastname,
        },
      });
    } catch (err: any) {
      console.log(err);
      setSignUpLoader(false);
      if (err.code === "UsernameExistsException") {
        onShowNotification("error", err.message);
      } else {
        onShowNotification("error", err.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.mainBg}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.titleOne}>
          <b>$19</b>/month
        </Typography>
        <Typography component="h3" variant="h5" className={classes.titleTwo}>
          <b>Try it for 7 days completely free</b>
        </Typography>
        <Typography component="h3" variant="h5" className={classes.titleTwo}>
          No charge until the end of trial.
        </Typography>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: earlyEmail || "",
            firstname: "",
            lastname: "",
            password: "",
            password2: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Please add your email address")
              .max(254, "Really!"),
            firstname: Yup.lazy(() => {
              return Yup.string()
                .required("Please add your firstname")
                .matches(/^[a-zA-Z ]+$/, "Only letters")
                .max(32, "Should be 32 characters or less");
            }),
            lastname: Yup.lazy(() => {
              return Yup.string()
                .required("Please add your lastname")
                .matches(/^[a-zA-Z ]+$/, "Only letters")
                .max(32, "Should be 32 characters or less");
            }),
            password: Yup.lazy(() => {
              return Yup.string()
                .required("No password provided")
                .min(8, "Too Short")
                .max(32, "Too long");
            }),
            password2: Yup.lazy(() => {
              return Yup.string()
                .required("No password provided")
                .oneOf([Yup.ref("password"), null], "Passwords must match");
            }),
          })}
          onSubmit={registerNewUser}
        >
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  id="firstname"
                  name="firstname"
                  variant="outlined"
                  required
                  fullWidth
                  label="First Name"
                  // autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  id="lastname"
                  name="lastname"
                  variant="outlined"
                  required
                  fullWidth
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  disabled={earlyEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="password"
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="password2"
                  name="password2"
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={signUpLoader}
            >
              {signUpLoader ? "Loading..." : " Sign Up"}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login">
                  <Typography variant="body2" className={classes.password}>
                    Already have an account?{" "}
                    <span className={classes.signCL}>Sign In</span>
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default container(SignUp);
