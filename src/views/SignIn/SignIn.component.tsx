import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import container from "./SignIn.container";
import { IAuth, IUserData } from "src/interface";

interface ISignInProps {
  auth: IAuth;
  onSigninStart: (values: IUserData, router: any) => void;
  onShowNotification: (status: string, message: string) => void;
  router: any;
}

const useStyles = makeStyles((theme) => ({
  mainBg: {
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
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: "#013c6c",
    margin: theme.spacing(3, 0, 2),
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#024f8e",
    },
  },
  password: {
    color: "#111",
    textDecoration: "none",
    [theme.breakpoints.only("xs")]: {
      fontSize: 14,
    },
  },
  signCL: {
    color: "#188EFB",
    [theme.breakpoints.only("xs")]: {
      fontSize: 14,
    },
  },
}));

const SignIn: React.FC<ISignInProps> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { auth, onSigninStart, onShowNotification } = props;

  React.useEffect(() => {
    if (auth.error) {
      onShowNotification("error", auth.error);
    }
  }, [auth.error, onShowNotification]);

  const handleSubmit = (
    values: IUserData,
    { setSubmitting }: { setSubmitting: (value: boolean) => void }
  ) => {
    onSigninStart(values, router);
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.mainBg}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Formik
          initialValues={{
            email: "",
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
            password: Yup.lazy(() => {
              return (
                Yup.string()
                  .required("No password provided")
                  // .min(8, 'Too Short')
                  .max(32, "Too long")
              );
            }),
          })}
          onSubmit={handleSubmit}
        >
          <Form className={classes.form}>
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              // autoFocus
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!!auth.loading}
              className={classes.submit}
            >
              {auth.loading ? "Loading..." : "Sign In"}
            </Button>
          </Form>
        </Formik>
        <Grid container>
          <Grid item xs>
            <Link href="/forgot-password">
              <Typography
                variant="body2"
                className={classes.password}
                style={{ color: "#409bfc" }}
              >
                Forgot Password?
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" >
            <Typography
               variant="body2" className={classes.password}
              >
              Don&apos;t have an account?{" "}
              <span className={classes.signCL}>Sign Up</span>
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default container(SignIn);
