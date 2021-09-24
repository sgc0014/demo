import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  nextBtn: {
    color: "#ffffff",
    width: 300,
    fontWeight: 400,
    fontFamily: "Arial",
    textTransform: "none",
    marginTop: 10,
    paddingTop: 10,
    marginBottom: 10,
    backgroundColor: "rgb(1 60 108);",
    "&:hover": {
      backgroundColor: "rgb(2 79 142);",
    },
  },
}));

const ShowMore = (props: any) => {
  const classes = useStyles();
  const { nextList } = props;

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="contained"
        disableElevation
        className={classes.nextBtn}
        onClick={nextList}
      >
        Show More
      </Button>
    </div>
  );
};

export default ShowMore;
