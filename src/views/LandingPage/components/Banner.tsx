import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "next/link";

interface IProps {
  isAuthenticated: boolean;
  isEarlyAccess: boolean;
  handleClickOpen: () => void;
}
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      height: 606,
      left: 0,
      background:
        "linear-gradient(to right, #083962, #104474, #185087, #215c9a, #2a68ae)",
      display: "flex",
      justifyContent: "space-around",
      [theme.breakpoints.down("md")]: {
        height: 560,
      },
      [theme.breakpoints.down("sm")]: {
        height: 520,
      },
      [theme.breakpoints.only("xs")]: {
        height: 455,
      },
    },
    spac: {
      color: theme.palette.common.white,
      marginTop: 170,
      marginBottom: 30,
      fontWeight: 500,
      fontSize: 37,
      [theme.breakpoints.down("xs")]: {
        fontSize: 24,
      },
      [theme.breakpoints.down("md")]: {
        marginTop: 150,
        fontSize: 34,
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: 120,
        fontSize: 34,
      },
      [theme.breakpoints.only("xs")]: {
        marginTop: 150,
        fontSize: 24,
      },
    },
    subtitle: {
      color: theme.palette.common.white,
      fontSize: 20,
      fontWeight: 300,
      marginTop: 10,
      [theme.breakpoints.only("xs")]: {
        fontSize: 16,
      },
    },
    startBtn: {
      color: "#000",
      // marginTop: 50,
      fontWeight: 600,
      background: theme.palette.common.white,
      textTransform: "none",
      padding: "16px 40px",
      fontSize: 16,
      [theme.breakpoints.only("xs")]: {
        padding: "10px 26px",
      },
    },
    media: {
      width: "100%",
      // marginTop: 80,
      marginTop: 140,
      marginBottom: 40,
      // boxShadow: 'rgba(0, 0, 0, 0.2) 0px 10px 60px -10px',
      borderRadius: 8,
      [theme.breakpoints.only("md")]: {
        // width: '490px',
        marginTop: 209,
      },
    },
    content_bg: {
      width: "500px",
    },
    ban_img: {
      width: "715px",
      [theme.breakpoints.only("md")]: {
        width: "412px",
      },
    },
    btnWrap: {
      // display: 'flex',
      marginTop: 50,
      // [theme.breakpoints.down('sm')]: {
      //   display: 'block'
      // },
    },
    btnCnt: {
      marginTop: 20,
      // marginLeft: 20,
      color: "#fff",
      fontSize: 16,
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0",
      },
    },
    itmType: {
      color: "#fffff",
      fontSize: "18px !important",
    },
    paper: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    messagePaper: {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    submit: {
      backgroundColor: "#013c6c",
      color: "#fff",
      margin: theme.spacing(3, 0, 2),
      minHeight: "45px",
      "&:hover": {
        backgroundColor: "#024f8e",
      },
    },
    titleOne: {
      fontSize: 24,
      padding: 3,
    },
    titleTwo: {
      fontSize: 18,
      padding: 3,
    },
  })
);

const Banner = (props: IProps) => {
  const classes = useStyles();
  const { isAuthenticated, isEarlyAccess, handleClickOpen } = props;

  return (
    <div className={classes.root} id="banner-blog">
      <Container>
        <Grid container justify="space-between">
          <Grid item className={classes.content_bg}>
            <Typography
              variant="inherit"
              component="h1"
              className={classes.spac}
            >
              Find your next SPAC IPO now
            </Typography>
            <Typography
              variant="inherit"
              component="p"
              className={classes.subtitle}
            >
              Don't let another opportunity pass you by again. You'll instantly
              be the first to know about breaking mergers and definitive
              agreements with premium SMS/email alerts.
            </Typography>
            <div className={classes.btnWrap}>
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button variant="contained" className={classes.startBtn}>
                    Go to dashboard
                  </Button>
                </Link>
              ) : (
                <Link href={isEarlyAccess ? "/#" : "/signup"}>
                  <Button
                    variant="contained"
                    className={classes.startBtn}
                    onClick={() => {isEarlyAccess ? handleClickOpen(): () => {}}}
                  >
                    {isEarlyAccess ? "Get Early Access" : "Start Free Trial"}
                  </Button>
                </Link>
              )}
              <div className={classes.btnCnt}>
                <Typography
                  variant="inherit"
                  component="p"
                  className={classes.itmType}
                >
                  No risk 7 day free Trial. Cancel Anytime.
                </Typography>
              </div>
            </div>
          </Grid>
          <Hidden smDown>
            <Grid item className={classes.ban_img}>
              <CardMedia
                alt="Image not available"
                component="img"
                className={classes.media}
                src={"/images/dashboard.png"}
                // onError={onMediaFallback}
              />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
