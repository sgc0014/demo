import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import container from './PaymentSuccess.container';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
    padding: '35px 0px',
    background: theme.palette.white,
    [theme.breakpoints.down('sm')]: {
      padding: '50px 0px 30px 0px',
    }
  },
  mainBg: {
    maxWidth: 600,
    padding: '10px 20px 80px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2);',
    borderRadius: '15px',
    marginTop: '180px',
    [theme.breakpoints.only('lg')]: {
      marginTop: 105,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 22,
      borderRadius: 0,
      boxShadow: '0 0 0px rgba(0,0,0,0.2);',
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
    // height: 'calc(82vh)'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: 'center'
  },
  message: {
    fontSize: 18,
    textAlign: 'center'
  },
  startBtn: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 50,
    fontWeight: 600,
    textTransform: 'none',
    padding: '16px 40px',
    background: 'rgb(1 60 108)',
    '&:hover': {
      background: 'rgb(2 79 142);'
    },
    [theme.breakpoints.only('xs')]: {
      padding: '10px 26px',
    }
  },
}));

function PaymentSuccess(props) {
  const classes = useStyles();
  const {
    auth: { isAuthenticated },
    userState: { profile: { firstname, email } },
    onSendStripePaymentSuccessEmail
  } = props;

  React.useEffect(() => {
    console.log('isAuthenticated: ', isAuthenticated);
    const parsedData = JSON.parse(localStorage.getItem('auth::register'));
    if (isAuthenticated && firstname && email) {
      console.log('inside isAuthenticated', firstname, email);
      onSendStripePaymentSuccessEmail('trialing', firstname, email);
    } else if (!isAuthenticated && parsedData) {
      console.log('else parsedData', parsedData.firstname, parsedData.email);
      onSendStripePaymentSuccessEmail('trialing', parsedData.firstname, parsedData.email);
    }
  }, [email]);

  return (
    <div className={classes.root}>
      <Container className={classes.mainBg}>
        <div className={classes.paper}>
          <Avatar component={Link} to="/dashboard" className={classes.avatar}>
            <CheckIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            Subscribed Successfully
          </Typography>
          <Typography component="h1" variant="h5" className={classes.message}>
            Thank you for subscription. You will receive your payment receipt&nbsp;
            after successful completion of the 7 days free trial.
          </Typography>
          <Button
            type="button"
            component={Link}
            to={isAuthenticated ? "/dashboard" : "/login"}
            variant="contained"
            color="default"
            className={classes.startBtn}
          >
            {isAuthenticated ? 'Go to dashboard' : 'Go to login'}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default container(PaymentSuccess);
