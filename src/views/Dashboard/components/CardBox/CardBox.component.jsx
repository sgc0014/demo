import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100%',
    borderRadius: 5,
    border: '1px solid #ccc',
    height: 130
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    display: 'flex',
    position: 'absolute',
    right: 10,
    top: 47,
    [theme.breakpoints.down('xs')]: {
      left: '11px',
      top: '83px'
    }
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  redIcon: {
    color: '#e52230'
  },
  differenceValue: {
    fontWeight: 500,
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  },
  redValue: {
    fontWeight: 500,
    color: '#e52230',
    marginRight: theme.spacing(1)
  },
  titleHead: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    }
  }
}));

const GainerLoser = (props) => {
  const { changeValue, preSymbol, postSymbol, changeType } = props;
  return (
    <>
      {parseFloat(changeValue) >= 0 ? (
        <span>
          {changeType ? `+${preSymbol}` : preSymbol}{changeValue}{postSymbol}
        </span>
      ) : (
        <span>
          -{preSymbol}{changeValue.replace('-', '')}{postSymbol}
        </span>
      )}
    </>
  );
};

const CardBox = ({ name, data, change, preSymbol, postSymbol, changeType, className }) => {
  const classes = useStyles();

  const getItem = () => {
    if (change) {
      if (change.price >= 0) {
        return (
          <>
            <ArrowUpwardIcon className={classes.differenceIcon} />
            <Typography className={classes.differenceValue} variant="body2">
              {change.price}%
            </Typography>
          </>
        );
      }
      return (
        <>
          <ArrowDownwardIcon className={classes.redIcon} />
          <Typography className={classes.redValue} variant="body2">
            {change.price}%
          </Typography>
        </>
      );
    }
    return (
      <>
        <ArrowDownwardIcon className={classes.redIcon} />
        <Typography className={classes.redValue} variant="body2">
          {change.price}
        </Typography>
      </>
    );
  };

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent style={{ position:'relative' }}>
        <Grid container justify="space-between">
          <Grid item> 
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {name}
            </Typography>
            <Typography variant="h3" className={classes.titleHead}>
              <GainerLoser
                preSymbol={preSymbol}
                changeValue={data ? data.price : null}
                postSymbol={postSymbol}
                changeType={changeType}
              />
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.difference}>{change ? getItem() : ''}</div>
      </CardContent>
    </Card>
  );
};

CardBox.propTypes = {
  className: PropTypes.string
};

export default CardBox;
