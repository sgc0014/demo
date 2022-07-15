import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: `100vh`,
    backgroundColor: '#f8f8f8',
    paddingTop: 20
  }
}));
function Main({ children }: any) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

export default Main;
