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
 
}) => {

  return (
    <>
      
    </>
  );
};

export default container(LandingPage);
