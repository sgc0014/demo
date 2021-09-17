import React from "react";
import { makeStyles,createStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
  Card,
  CardHeader,
  CardActions,
} from "@material-ui/core";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShowMore from "src/common/ShowMore";
import container from "./Rss.container";
import { IRssState } from "src/interface/";

const useStyles = makeStyles((theme:any) => createStyles({
  root: {
    minHeight: 600,
    padding: "35px 0px",
    background: theme.palette.white,
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px 30px 0px",
    },
  },
  loading: {
    width: "100%",
    marginTop: "3em",
    marginBottom: "3em",
  },
  card: {
    width: "100%",
    marginTop: 8,
    border: "1px solid #ccc",
    marginBottom: "1%",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "0%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  subheader: {
    fontSize: 16,
  },
  title: {
    color: "#409bfc",
  },
  link: {
    color: "rgb(1 60 108);",
    fontSize: 16,
    textDecoration: "none",
    fontWeight: 500,
    lineHeight: "35px",
  },
  newsbg: {
    margin: "2% 0",
    [theme.breakpoints.down("sm")]: { margin: "8% 0" },
  },
  container: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.between("599", "750")]: {
      display: "inline",
      justifyContent: "space-around",
    },
  },
  rssContainer: {
    margin: "auto",
    textAlign: "center",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    [theme.breakpoints.between("599", "750")]: {
      display: "inline",
    },
  },
  textField: {
    [theme.breakpoints.up("sm")]: {
      minWidth: 500,
    },
  },
  submit: {
    background: "rgb(1 60 108);",
    margin: theme.spacing(2, 0),
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgb(2 79 142);",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "-40px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "-450px",
    },
    [theme.breakpoints.between("599", "750")]: {
      marginLeft: "0px",
    },
    [theme.breakpoints.between("960", "1165")]: {
      marginLeft: "-40px",
    },
    [theme.breakpoints.between("1165", "1350")]: {
      marginLeft: "-220px",
    },
  },
}));

interface IRssProps {
  rssState: IRssState;
  onFetchRSSStart: (url:string) => void;
  onFetchRSSHistory: () => void;
}
const RssPage = (props:IRssProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesXSBT = useMediaQuery(theme.breakpoints.between(599, 750));
  const {
    rssState: { isFetching, url, results, history },
    onFetchRSSStart,
    onFetchRSSHistory,
    // onShowNotification
  } = props;
  const [more, setMore] = React.useState(10);
  const [inputUrl, setInputUrl] = React.useState<string>('');
  const rssLink =
    'https://news.google.com/rss/search?q="spac" definitive agreement+when:24h&ceid=US:en&hl=en-US&gl=US';

  // const inputTextHandler = (event) => {
  //   setInputUrl(event.target.value);
  // };

  const onInputChangeHandler = (event:any) => {
    if (event.target.value && typeof event.target.value === "string") {
      setInputUrl(event.target.value);
    } else {
      setInputUrl('');
    }
  };

  const onChangeHandler = (event:any, val:any) => {
    if (val) {
      setInputUrl(val.url);
    }
  };

  const rssSearchHandler = () => {
    console.log("inputUrl: ", inputUrl);
    if (inputUrl) {
      onFetchRSSStart(inputUrl);
    } else {
      onFetchRSSStart(rssLink);
      // onShowNotification('error', 'Please enter the valid RSS field.');
    }
  };

  const seeMoreHandler = () => {
    setMore(more + 10);
  };

  const headerLink = (props:any) => {
    return (
      <a href={props.link} className={classes.link} target="_">
        {props.title}
      </a>
    );
  };

  React.useEffect(() => {
    setInputUrl(url);
    onFetchRSSHistory();
  }, [url]);

  const rssList = [
    {
      name: "CNBC RSS",
      url: `http://www.cnbc.com/id/19746125/device/rss/rss.xml`,
    },
    {
      name: "Fortune RSS",
      url: `https://fortune.com/feed`,
    },
    {
      name: "Financial Times",
      url: `https://www.ft.com/?format=rss`,
    },
    {
      name: "Seeking Alpha",
      url: `https://seekingalpha.com/market_currents.xml`,
    },
    {
      name: "The Economic Times",
      url: `https://economictimes.indiatimes.com/rssfeedsdefault.cms`,
    },
    {
      name: "Yahoo News",
      url: `https://finance.yahoo.com/news/rssindex`,
    },
  ];

  const selectRssSearch = (events:any) => {
    if (events.currentTarget.value) {
      setInputUrl(events.currentTarget.value);
      onFetchRSSStart(events.currentTarget.value);
    }
  };

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Grid className={classes.newsbg}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} className={classes.container}>
              <Autocomplete
                id="rss-search"
                options={history}
                getOptionLabel={(option) => option.url}
                freeSolo
                onInputChange={onInputChangeHandler}
                onChange={onChangeHandler}
                inputValue={inputUrl || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    id="rssInput"
                    label=""
                    fullWidth={matchesXS || matchesXSBT}
                    className={classes.textField}
                    value={inputUrl || ""}
                    // onChange={(value) => inputTextHandler(value)}
                    onKeyDown={(e:any) => {
                      if (e.keyCode === 13 && e.target.value) {
                        rssSearchHandler();
                      }
                    }}
                    placeholder="Enter RSS link or URL"
                  />
                )}
              />
              <Button
                type="button"
                fullWidth={matchesXS || matchesXSBT}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={rssSearchHandler}
              >
                Search RSS Link
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              className={classes.rssContainer}
              style={{ color: "rgb(202 202 202)" }}
            >
              {rssList.map((value) => {
                return (
                  <Button
                    variant="outlined"
                    // startIcon={<RssFeedIcon />}
                    style={{ margin: "0px 5px" }}
                    value={value.url}
                    onClick={selectRssSearch}
                  >
                    {value.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.newsbg}>
          {isFetching ? (
            <div className={classes.loading}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            results.slice(0, more).map((row, index) => (
              <Card key={`rss-news-${index}`} className={classes.card}>
                <div className={classes.cardContainer}>
                  <div className={classes.details}>
                    <CardHeader
                      title={headerLink(row)}
                      subheader={
                        row.pubDate ? row.pubDate.substring(0, 25) : ""
                      }
                      classes={{
                        subheader: classes.subheader,
                        title: classes.title,
                      }}
                    />
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        component="a"
                        href={row.link}
                        target="_blank"
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </div>
                </div>
              </Card>
            ))
          )}
        </Grid>
        {!isFetching && results.length > more && (
          <ShowMore nextList={seeMoreHandler} />
        )}
      </Container>
    </div>
  );
};

export default container(RssPage);
