import React from "react";
// import { loadStripe } from '@stripe/stripe-js';
import Link from "next/link";
import {
  makeStyles,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
} from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import typography from "../../../theme/typography";
// import axios from 'axios';

interface IProps {
  isEarlyAccess: boolean;
  handleClickOpen: () => void;
}
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: "5em",
      paddingBottom: "5em",
      background: "#ccc",
    },
    container: {
      margin: "auto",
      textAlign: "center",
    },
    title: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "30px",
      lineHeight: "47px",
      color: "#000000",
      [theme.breakpoints.down("xs")]: {
        fontSize: 30,
      },
    },
    subtitle: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "47px",
      color: "#6b6b6b",
    },
    heroContent: {
      padding: "3em 0",
    },
    cardHeader: {
      backgroundColor: "#013c6c",
      color: "#fff",
      fontWeight: 600,
      // backgroundColor:
      //   theme.palette.type === 'light'
      //     ? theme.palette.grey[200]
      //     : theme.palette.grey[700]
    },
    cardTitle: {
      color: "#fff",
      fontWeight: 600,
    },
    cardPricing: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: "5px",
    },

    dltTitle: {
      position: "relative",
      fontSize: 30,
      "&:before": {
        content: '""',
        display: "block",
        width: "100%",
        borderTop: "3px solid red",
        height: "12px",
        position: "absolute",
        bottom: 5,
        left: 0,
        transform: "rotate(-40deg)",
      },
      "&:after": {
        content: '""',
        display: "block",
        width: "100%",
        borderTop: "3px solid red",
        height: "12px",
        position: "absolute",
        bottom: 15,
        right: 0,
        transform: "rotate(-140deg)",
      },
    },
    specialPrice: {
      textAlign: "center",
      fontWeight: 500,
      marginBottom: "15px",
      fontSize: 17,
    },
  })
);

const Pricing = (props: IProps) => {
  const classes = useStyles();

  // const [stripe, setStripe] = useState(null);
  const isAuthenticated = false;
  const isEarlyAccess = true;
  const handleClickOpen = () => {};
  const tiers = [
    {
      title: "Premium",
      subheader: "Most popular",
      price: "19",
      priceId: "price_1IeGKGEvdBGhexVAjdvNS5CD",
      description: [
        "Premium instant email and SMS alerts",
        "SPAC dashboard with charts ",
        "Top 10 gainers/losers, bubble chart",
        "RSS and latest News feeds",
      ],
      buttonText: "Try for Free",
      buttonVariant: "contained",
    },
  ];

  // const showErrorMessage = (message) => {
  //   console.error(message);
  // };
  //
  // // If a fetch error occurs, log it to the console and show it in the UI.
  // const handleFetchResult = (result) => {
  //   console.log(result);
  //   if (result.status !== 200) {
  //     if (result.error && result.error.message) {
  //       throw new Error(
  //         `${result.url} ${result.status} ${result.error.message}`
  //       );
  //     }
  //   }
  //   return result.data;
  // };

  // // Handle any errors returned from Checkout
  // const handleResult = (result) => {
  //   if (result.error) {
  //     showErrorMessage(result.error.message);
  //   }
  // };
  //
  // // Create a Checkout Session with the selected plan ID
  // const createCheckoutSession = (priceId) => {
  //   console.log('priceId>>>', priceId);
  //   return axios
  //     .post(
  //       'https://br6czx0kl6.execute-api.us-east-1.amazonaws.com/dev/create-checkout-session',
  //       {
  //         priceId
  //       }
  //     )
  //     .then(handleFetchResult);
  // };

  // const handleClick = (priceId) => {
  //   createCheckoutSession(priceId).then((data) => {
  //     // Call Stripe.js method to redirect to the new Checkout page
  //     console.log('data>>>', data);
  //     stripe
  //       .redirectToCheckout({
  //         sessionId: data.sessionId
  //       })
  //       .then(handleResult);
  //   });
  // };

  return (
    <div className={classes.root} id="pricing-blog">
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h3" className={classes.title} align="center">
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          // color="textSecondary"
          component="p"
        >
          Stock Analytics for SPACs.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container justify="center">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                  title={tier.title}
                  // subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Premium"}
                  className={classes.cardHeader}
                  classes={{ title: classes.cardTitle }}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      /month
                    </Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="left"
                          key={line}
                          style={{ fontWeight: 300 }}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardActions style={{ padding: "5px 25px 25px" }}>
                  {isAuthenticated ? (
                    <Link href={"/dashboard"}>
                      <Button
                        fullWidth
                        color="primary"
                        style={{
                          color: "#fff",
                          backgroundColor: "#013c6c",
                        }}
                      >
                        Go to dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link href={isEarlyAccess ? "/#" : "/signup"}>
                      <Button
                        fullWidth
                        color="primary"
                        style={{
                          color: "#fff",
                          backgroundColor: "#013c6c",
                        }}
                        onClick={isEarlyAccess ? handleClickOpen : () => {}}
                      >
                        {isEarlyAccess ? "Get Early Access" : tier.buttonText}
                      </Button>
                    </Link>
                  )}
                </CardActions>
                <div style={{ marginBottom: 20 }}>
                  <Typography
                    align="center"
                    // color="textSecondary"
                    component="p"
                  >
                    No risk. Cancel Anytime
                  </Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Pricing;
