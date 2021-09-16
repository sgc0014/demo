import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Topbar, Footer } from "../Main/components";

interface IProps {
  children: React.ReactNode;
  noFooter: boolean;
}
const useStyles = makeStyles(() => ({
  root: {},
}));

const Minimal: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { children, noFooter } = props;
  // if (window.wiser) {
  //   console.log("success wiser notify minimal");
  //   window.wiser.resetNotif(window.location.href);
  // } else {
  //   console.log("failed wiser notify minimal");
  // }

  return (
    <div className={classes.root}>
      <Topbar minimalLayout {...props} />
      {children}
      {!noFooter && <Footer />}
    </div>
  );
};

export default Minimal;
