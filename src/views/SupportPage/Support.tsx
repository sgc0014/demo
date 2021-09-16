import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: 600,
    margin: "60px 0px",
    padding: "35px 0px",
    overflowX: "hidden",
    background: theme.palette.white,
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px 30px 0px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "90px 0px",
    },
  },
  header: {
    fontWeight: 400,
  },
  content: {
    color: "#161c2d",
    fontSize: "1.0625rem",
    marginTop: 10,
    fontWeight: 400,
    lineHeight: 1.6,
  },
  effective: {
    fontWeight: 300,
    marginTop: 10,
    fontSize: "1.10rem",
    letterSpacing: ".08em",
    lineHeight: 1.55,
  },
  title: {
    fontWeight: 400,
    marginTop: 10,
    fontSize: "1.10rem",
    letterSpacing: ".08em",
    lineHeight: 1.55,
  },
  link: {
    color: "#d28838",
    paddingLeft: 10,
    paddingRight: 10,
    textDecoration: "none",
  },
}));

const Support = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid>
          <Typography
            variant="inherit"
            component="h1"
            className={classes.header}
          >
            SPACrun Support
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            1. Can I try SPACrun before subscribing?
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Yes, SPACrun provides a risk-free trial. You will not be charged
            until the trial is over.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            2. I’ve started a free trial but I haven’t received the confirmation
            email
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Please check your Spam folder if you've been waiting for a few
            minutes. Send an email to support@spacrun.com if you can't find your
            confirmation email there. You can also go to
            <Link href="/login">
              <Typography component="span" className={classes.link}>
                https://www.spacrun.com/login
              </Typography>
            </Link>
            {/* <span className={classes.link}>https://www.spacrun.com/login</span>  */}
            and select "Forgot Password?"
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            3. Can I request a refund?
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            In the trial period, we encourage our users to test the complete
            SPACrun features. Until the trial period, you are not charged. After
            trial ends or the date of renewal no refunds will be issued for
            subscriptions. We are unable to handle refunds, and before that,
            please cancel your trial or subscription.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            4. Will you renew my subscription automatically?
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Yes, your subscription will be automatically renewed according to
            your subscription.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            5. I would like to stop receiving SMS and/or email alerts
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            For specific SPACs, go to
            <Link href="/following">
              <Typography
                variant="inherit"
                component="span"
                className={classes.link}
              >
                {" "}
                https://www.spacrun.com/following
              </Typography>
            </Link>
            {/* <span className={classes.link}>https://www.spacrun.com/following</span>  */}
            and Unclick SMS or Email Alerts on the company you wish to
            unsubscribe from. For all alerts, go to
            <Link href="/profile">
              <Typography
                variant="inherit"
                component="span"
                className={classes.link}
              >
                {" "}
                https://www.spacrun.com/profile
              </Typography>
            </Link>
            {/* <span className={classes.link}>https://www.spacrun.com/profile</span>  */}
            and Unclick SMS or Email Alerts.
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            6. Can I change the phone number for SMS and/or email alerts
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Because your email is linked to your account, you can only change
            your phone number from
            <Link href="/profile">
              <Typography
                variant="inherit"
                component="span"
                className={classes.link}
              >
                {" "}
                https://www.spacrun.com/profile
              </Typography>
            </Link>
            {/* <span className={classes.link}>https://www.spacrun.com/profile</span>. */}
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            7. I want to cancel my plan
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            We hate to see you go as we are always striving to provide value and
            improving with new features, but simply click Cancel Subscription
            from your
            <Link href="/profile">
              <Typography
                variant="inherit"
                component="span"
                className={classes.link}
              >
                {" "}
                https://www.spacrun.com/profile
              </Typography>
            </Link>
            {/* <span className={classes.link}>https://www.spacrun.com/profile</span> */}
          </Typography>
          <Typography
            variant="inherit"
            component="h2"
            className={classes.title}
          >
            8. I need more assistance
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className={classes.content}
          >
            Please contact
            <Link href="/support">
              <Typography
                variant="inherit"
                component="span"
                className={classes.link}
              >
                {" "}
                support@spacrun.com
              </Typography>
            </Link>
            {/* <span className={classes.link}>support@spacrun.com</span> */}
          </Typography>
        </Grid>
      </Container>
    </div>
  );
};

export default Support;
