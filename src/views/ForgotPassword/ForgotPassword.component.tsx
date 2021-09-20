import React from "react";
import { Auth } from "aws-amplify";
import Container from "@material-ui/core/Container";
import { makeStyles, Typography, Grid, Button } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";
const useStyles = makeStyles((theme: any) => ({
  alert: {
    fontSize: 16,
    marginTop: 115,
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      marginTop: 60,
    },
  },
  mainBg: {
    padding: "10px 20px 80px",
    boxShadow: "0 0 20px rgba(0,0,0,0.2);",
    borderRadius: "15px",
    marginTop: 40,
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
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

const ForgotPassword = () => {
  const classes = useStyles();
  const router = useRouter();
  const [submitLoader, setSubmitLoader] = React.useState(false);

  const forgotPasswordHandler = async (values: any) => {
    setSubmitLoader(true);
    console.log("values: ", values);
    try {
      await Auth.forgotPassword(values.email);
      setSubmitLoader(false);
      router.push({ pathname: "/forgot-password-verification" });
    } catch (e) {
      console.error(e);
      setSubmitLoader(false);
    }
  };

  return (
    <>
      <Alert severity="info" className={classes.alert}>
        If your email address is registered in our system, you will receive a
        password recovery code at your email address within a few minutes.
      </Alert>
      <Container component="main" maxWidth="xs" className={classes.mainBg}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Forgot Password?
          </Typography>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Please add your email address")
                .max(254, "Really!"),
            })}
            onSubmit={forgotPasswordHandler}
          >
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
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
                {submitLoader ? "Loading..." : "Submit"}
              </Button>
            </Form>
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
