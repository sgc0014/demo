import React from 'react';
import container from './Top10.container';
import {BidTables}  from '@views/LandingPage/components';
import { Container, Grid } from '@material-ui/core';
import { makeStyles,createStyles } from '@material-ui/core/styles';
import { BubbleChartBox } from './components';
import {IAuth,ISpacrun} from 'src/interface'

const useStyles = makeStyles((theme:any) => createStyles({
  root: {
    minHeight: 600,
    padding: '35px 0px',
    background: theme.palette.white,
    [theme.breakpoints.down('sm')]: {
      padding: '50px 0px 30px 0px'
    }
  },
  newsbg: {
    margin: '2% 0',
    [theme.breakpoints.down('sm')]: { margin: '8% 0' }
  },
}));

interface ITop10Props{
  auth:IAuth;
  spacrunState:ISpacrun
}
const Top10 = (props:ITop10Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Grid>
          <BidTables {...props} />
        </Grid>
        <Grid>
          <BubbleChartBox {...props} />
        </Grid>
      </Container>
    </div>
  );
}

export default container(Top10);
