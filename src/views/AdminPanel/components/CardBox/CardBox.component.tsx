import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    height: 165,
    border: '1px solid #ccc'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: '#013c6c',
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
}));
interface ICardBoxProps{
  name:string;
  Icon:any;
  data:string;
  subtitle:string;
}
const CardBox = (props:ICardBoxProps) => {
  const classes = useStyles();
  const { name, Icon, data, subtitle } = props;
  return (
    <Card className={clsx(classes.root)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              {name}
            </Typography>
            <Typography color="inherit" variant="h3">
              {data}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Icon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>{subtitle}</div>
      </CardContent>
    </Card>
  );
};

export default CardBox;
