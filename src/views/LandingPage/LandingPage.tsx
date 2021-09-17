import React from "react";
import { Banner, Features, Pricing } from "./components";
import { Container, Grid, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import container from "./LandingPage.container";
import { scrollToMainTop } from "@common/utils";
import { IAuth } from "../../interface";
import EarlyAccessDialog from "./components/EarlyAccessDialog";

export interface ILandingProps {
  onSetDialogOpen?: (value: boolean) => void;
  auth: IAuth;
}
const useStyles = makeStyles((theme) => ({
  footer: {
    color: "rgb(204 204 204)",
    padding: theme.spacing(2),
    background:
      "linear-gradient(to right, #083962, #083962, #083962, #083962, #083962)",
  },
  root: {
    marginTop: "3em",
    [theme.breakpoints.up("sm")]: {
      marginTop: "5em 0",
    },
  },
  mrgItem: {
    // marginTop: '6em',
    [theme.breakpoints.down("xs")]: {
      marginTop: "0",
    },
  },
  scrollUpIcon: {
    right: 30,
    bottom: 30,
    color: "#fff",
    position: "fixed",
    background: "#a1acbb",
    "&:hover": {
      background: "#acb6c3",
    },
  },
  text: {
    fontWeight: 300,
    marginTop: 10,
    fontSize: "1.10rem",
    letterSpacing: ".08em",
    lineHeight: 1.55,
  },
  subText: {
    color: "rgb(156 156 156)",
    fontSize: "16px",
    marginTop: 10,
    fontWeight: 400,
    lineHeight: 1.6,
    textDecoration: "none",
    textAlign: "left",
  },
  link: {
    marginRight: 40,
    color: "rgb(204 204 204)",
    textDecoration: "none",
    fontWeight: 400,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  footerLink: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Link href="https://spacrun.com/">
      <Typography
        component="p"
        variant="body2"
        align="center"
        className={classes.subText}
        style={{ color: "#ffffff" }}
      >
        {"Copyright © "}
        spacrun.com {new Date().getFullYear()}
        {"."}
      </Typography>
    </Link>
  );
}
const LandingPage: React.FC<ILandingProps> = ({
  onSetDialogOpen,
  auth: { isAuthenticated },
}) => {
  const classes = useStyles();

  const isEarlyAccess = false;

  const handleClickOpen = () => {
    onSetDialogOpen && onSetDialogOpen(true);
  };

  return (
    <>
      <IconButton
        aria-label="up-arrow"
        className={classes.scrollUpIcon}
        onClick={() => scrollToMainTop()}
      >
        <ExpandLessIcon />
      </IconButton>
      <Banner
        isEarlyAccess={isEarlyAccess}
        handleClickOpen={handleClickOpen}
        isAuthenticated={isAuthenticated}
      />
      <div className={classes.mrgItem}>
        <Features />
      </div>
      <Pricing
        isEarlyAccess={isEarlyAccess}
        handleClickOpen={handleClickOpen}
      />
      <footer className={classes.footer}>
        <div className={classes.root} id="features-blog">
          <Container>
            <Grid item>
              <div className={classes.footerLink}>
                <Typography
                  variant="inherit"
                  component="div"
                  className={classes.text}
                >
                  <Link href="/terms">
                    <Typography className={classes.link}>
                      Terms Of Service
                    </Typography>
                  </Link>
                </Typography>
                <Link href="/privacy">
                  <Typography
                    variant="inherit"
                    component="div"
                    className={classes.text}
                    style={{ marginBottom: "0px" }}
                  >
                    <Typography className={classes.link}>
                      Privacy Policy
                    </Typography>
                  </Typography>
                </Link>
                <Link href="/support">
                <Typography
                  className={classes.text}
                  style={{ marginBottom: "2rem" }}
                >
                  <Typography className={classes.link}>Support</Typography>
                </Typography>
                </Link>
              </div>
              <Typography
                variant="inherit"
                component="div"
                className={classes.text}
              >
                Disclaimer
              </Typography>
              <br />
              <Typography
                variant="inherit"
                component="p"
                className={classes.subText}
              >
                This site is for informational purposes only and does not
                constitute any financial advice. Spacrun.com does not provide
                any advices on investment; all information, ideas, and
                strategies should not be construed as a recommendation to buy,
                sell, or hold any security. Spacrun.com is not liable for any
                investment decisions made by the users based on the information
                available on the site. In addition, investment involves risk and
                possible loss of investment capital. SPACs are risky
                investments, and investments in them should be made with a great
                deal of caution, regardless of their current performance.
                Spacrun.com makes no representations or warranties of any kind,
                express or implied, about the completeness, accuracy,
                reliability, suitability or availability with respect to the
                website or the information, products, services, or related
                graphics contained on the website for any purpose. Any reliance
                you place on such information is therefore strictly at your own
                risk. Spacrun.com highly recommends you seek advice from a
                professional.
              </Typography>
              <Copyright />
            </Grid>
          </Container>
        </div>
      </footer>
      <EarlyAccessDialog />
    </>
  );
};

export default container(LandingPage);
