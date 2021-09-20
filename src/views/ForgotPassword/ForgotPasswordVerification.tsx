import React from "react";
import { Auth } from "aws-amplify";
import Container from "@material-ui/core/Container";
import { makeStyles, Typography, Grid, Button } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import container from "./ForgotPasswordVerification.container";

const useStyles = makeStyles((theme: any) => ({
  mainBg: {
    padding: "10px 20px 80px",
    boxShadow: "0 0 20px rgba(0,0,0,0.2);",
    borderRadius: "15px",
    marginTop: "180px",
    [theme.breakpoints.down("xs")]: {
      marginTop: 22,
      borderRadius: 0,
      boxShadow: "0 0 0px rgba(0,0,0,0.2);",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    background: "rgb(1 60 108);",
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgb(2 79 142);",
    },
  },
}));

interface IForgotPasswordVerificationProps {
  history: any;
  onShowNotification: (status: string, message: string) => void;
}
const ForgotPasswordVerification = (
  props: IForgotPasswordVerificationProps
) => {
  const classes = useStyles();
  const { history, onShowNotification } = props;
  const [submitLoader, setSubmitLoader] = React.useState(false);

  const forgotPasswordConfirmHandler = async (values:any) => {
    setSubmitLoader(true);
    console.log("values: ", values);
    try {
      await Auth.forgotPasswordSubmit(
        values.email,
        values.code,
        values.newPassword
      );
      setSubmitLoader(false);
      onShowNotification(
        "success",
        "Your password has been changed successfully."
      );
      history.push({ pathname: "/login" });
    } catch (e:any) {
      console.error(e);
      onShowNotification("error", e.message);
      setSubmitLoader(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.mainBg}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Formik
          initialValues={{
            code: "",
            email: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={Yup.object({
            code: Yup.string().required("Please add confirm code."),
            email: Yup.string()
              .required("Please add your email address")
              .email("Invalid email address")
              .max(254, "Really!"),
            newPassword: Yup.lazy(() => {
              return Yup.string()
                .required("No password provided")
                .min(8, "Too Short")
                .max(32, "Too long");
            }),
            confirmNewPassword: Yup.lazy(() => {
              return Yup.string()
                .required("No password provided")
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match");
            }),
          })}
          onSubmit={forgotPasswordConfirmHandler}
        >
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  fullWidth
                  id="code"
                  label="Enter Code"
                  name="code"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Enter Email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  fullWidth
                  id="newPassword"
                  label="Enter New Password"
                  type="password"
                  name="newPassword"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  fullWidth
                  id="confirmNewPassword"
                  label="Confirm New Password"
                  type="password"
                  name="confirmNewPassword"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={submitLoader}
            >
              {submitLoader ? "Loading..." : "Verify Code"}
            </Button>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default container(ForgotPasswordVerification);
