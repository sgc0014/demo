import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  CardMedia,
  Hidden,
} from "@material-ui/core";

interface IImage {
  title: string;
  description: string;
  imgSrc: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "3em",
    [theme.breakpoints.up("sm")]: {
      marginTop: "5em 0",
    },
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
    fontSize: 18,
  },
  media: {
    height: "auto",
    maxWidth: "100%",
    width: "100%",
    marginTop: "90px",
    marginBottom: 40,
    boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px",
    borderRadius: 15,
    [theme.breakpoints.down("xs")]: {
      marginTop: "30px",
      marginBottom: 0,
    },
  },
  heading: {
    marginTop: 40,
    marginBottom: 20,
    fontWeight: 500,
    fontSize: 24,
    fontFamily: "inherit",
    lineHeight: 1.1,
    color: "inherit",
  },
  subheading: {
    fontSize: 16,
    fontWeight: 400,
    marginTop: 10,
    lineHeight: "24px",
  },
  featureContainer: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "nowrap",
    },
  },
  detailRight: {
    [theme.breakpoints.up("md")]: {
      width: "70%",
      marginLeft: "10%",
      marginTop: "7%",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  detailLeft: {
    [theme.breakpoints.up("md")]: {
      width: "70%",
      marginRight: "10%",
      marginTop: "7%",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

const ImageLeft = (props:IImage) => {
  const classes = useStyles();
  const { title, imgSrc, description } = props;
  return (
    <Grid container className={classes.featureContainer}>
      <Grid item>
        <CardMedia
          alt="Image not available"
          component="img"
          className={classes.media}
          src={imgSrc}
        />
      </Grid>
      <Grid item className={classes.detailRight}>
        <Typography
          variant="inherit"
          component="h2"
          className={classes.heading}
        >
          {title}
        </Typography>
        <Typography
          variant="inherit"
          component="p"
          className={classes.subheading}
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

const ImageRight = (props:IImage) => {
  const classes = useStyles();
  const { title, imgSrc, description } = props;
  return (
    <Grid container className={classes.featureContainer}>
      <Grid item className={classes.detailLeft}>
        <Typography
          variant="inherit"
          component="h2"
          className={classes.heading}
        >
          {title}
        </Typography>
        <Typography
          variant="inherit"
          component="p"
          className={classes.subheading}
        >
          {description}
        </Typography>
      </Grid>
      <Grid item>
        <CardMedia
          alt="Image not available"
          component="img"
          className={classes.media}
          src={imgSrc}
        />
      </Grid>
    </Grid>
  );
};

const Features = () => {
  const classes = useStyles();
  return (
    <div className={classes.root} id="features-blog">
      <Container maxWidth="sm" component="main">
        <Typography component="h2" className={classes.title} align="center">
          Your Definitive SPAC Analytics Tool
        </Typography>
        <Typography
          variant="h5"
          align="center"
          component="p"
          className={classes.subtitle}
        >
          SPACrun keeps track of your favorite SPAC stocks and sends out
          real-time email and SMS alerts when important news is released. With
          incredible research tools, you can save time and profit from your own
          due diligence and access the best spac stocks to buy now.
        </Typography>
      </Container>
      <Container>
        <ImageRight
          title="SPAC Dashboard"
          imgSrc={"/images/spac_dashboard.png"}
          description={`View your favorite SPACs in an easy-to-read chart with historical performance, or browse via your own sorted list to find more.`}
        />
      </Container>
      <Container>
        <ImageRight
          title="Top SPAC Stocks"
          imgSrc={"/images/spac_top10.png"}
          description={`Review the Top 10 performing daily, weekly, and monthly gainers, losers, and volume spikes to identify your hidden gems or SPAC runners.`}
        />
      </Container>
      <Container>
        <ImageRight
          title="SPAC Bubble Chart"
          imgSrc={"/images/bubble-chart.png"}
          description={`Quickly see daily, weekly, monthly top gainers and losers in a unique bubble chart.`}
        />
      </Container>
      <Container>
        <ImageRight
          title="SPAC News"
          imgSrc={"/images/spac_news.png"}
          description={`Get the most recent SPAC news about mergers and definitive agreements from a variety of sources with ease, so you can read more in less time.`}
        />
      </Container>
      <Container>
        <ImageRight
          title="SPAC RSS"
          imgSrc={"/images/spac_rss.png"}
          description={`Follow your favorite RSS feeds to receive news with your own RSS feeds or using essential feeds including CNBC, Fortune, Financial Times, Seeking Alpha, The Economic Times, and Yahoo News.`}
        />
      </Container>
      <Container>
        <ImageRight
          title="SPAC Reddit"
          imgSrc={"/images/spac_reddit.png"}
          description={`Monitor daily top SPAC social media posts and comments with sentiments from other reddit users to get the latest trending SPAC stocks.`}
        />
      </Container>
      <Container>
        <ImageRight
          title="SPAC Following - SPAC Stocks to Buy"
          imgSrc={"/images/spac_following.png"}
          description={`Set your preferred SPAC stocks to receive email and/or SMS alerts about the newest mergers or definitive agreements, so you don't have to keep an eye on them all the time.`}
        />
      </Container>
    </div>
  );
};

export default Features;
