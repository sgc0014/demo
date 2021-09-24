import {
  Button,
  Card, CardActions, CardContent, CardHeader, Container,
  Grid,
  TextField,
  Tooltip, Typography, useMediaQuery,
  useTheme
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import React from "react";
import { formatDateTimeMilliseconds } from "src/common/utils";
import { IRedditState } from "src/interface/";
import container from "./Reddit.container";

const useStyles = makeStyles((theme: any) => ({
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
    color: "rgb(1 60 108)",
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
      justifyContent: "left",
    },
    [theme.breakpoints.between(599, 750)]: {
      display: "inline",
      justifyContent: "left",
    },
  },
  rssContainer: {
    margin: "auto",
    textAlign: "center",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    [theme.breakpoints.between(599, 750)]: {
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
    marginLeft: "16px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgb(2 79 142);",
    },
  },
  tabRoot: {
    width: 80,
    margin: 0,
  },
  selected: {
    width: 80,
    color: "#ffffff",
    background: "#013c6c",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
}));

interface IRedditProps {
  redditState: IRedditState;
  onFetchPostsStart: (query: string) => void;
  onFetchCommentsStart: (query: string) => void;
}
const Reddit = (props: IRedditProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesXSBT = useMediaQuery(theme.breakpoints.between(599, 750));
  const {
    redditState: { isFetching, query, posts, comments },
    onFetchPostsStart,
    onFetchCommentsStart,
  } = props;
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [tabValue, setTabValue] = React.useState("1");

  const handleChange = (event: any, newTab: string) => {
    setTabValue(newTab);
  };

  const inputTextHandler = (event: any) => {
    setSearchInput(event.target.value);
  };

  const searchHandler = () => {
    console.log("searchInput: ", searchInput);
    if (searchInput) {
      onFetchPostsStart(searchInput);
      onFetchCommentsStart(searchInput);
    }
  };

  // const seeMorePosts = () => {
  //   onFetchPostsStart(searchInput);
  // };

  // const seeMoreComments = () => {
  //   onFetchCommentsStart(searchInput);
  // };
  interface IPostComment {
    subreddit: {
      name: string;
    };
    created_utc: string;
    sentiment?: number;
  }
  const postsSubtitle = (props: IPostComment) => {
    return (
      <Typography component="h2">
        <Typography component="span" style={{ textTransform: "uppercase" }}>
          {props.subreddit ? `R/${props.subreddit.name}` : ""}
        </Typography>
        <Typography component="span" style={{ color: "rgba(0, 0, 0, 0.54)" }}>
          {`, ${formatDateTimeMilliseconds(props.created_utc)}`}
        </Typography>
      </Typography>
    );
  };

  const commentsTitle = (props: IPostComment) => {
    return (
      <Typography component="h2">
        <Typography component="span" style={{ textTransform: "uppercase" }}>
          {props.subreddit ? `R/${props.subreddit.name}` : ""}
        </Typography>
        <Typography component="span" style={{ color: "rgba(0, 0, 0, 0.54)" }}>
          {`, ${formatDateTimeMilliseconds(props.created_utc)}`}
        </Typography>
        {props.sentiment !== 0 && props.sentiment && (
          <Typography component="span" style={{ color: "rgba(0, 0, 0, 0.54)" }}>
            ,&nbsp;
            {props.sentiment && props.sentiment > 0 ? (
              <Typography component="span" style={{ color: "green" }}>
                {`${props.sentiment} `}
              </Typography>
            ) : (
              <Typography component="span" style={{ color: "red" }}>
                {`${props.sentiment} `}
              </Typography>
            )}
            SENTIMENT RATING
          </Typography>
        )}
      </Typography>
    );
  };

  React.useEffect(() => {
    setSearchInput(query);
  }, [query]);

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Grid className={classes.newsbg}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} className={classes.container}>
              <TextField
                variant="outlined"
                id="redditInput"
                label="Search for"
                fullWidth={matchesXS || matchesXSBT}
                className={classes.textField}
                value={searchInput || ""}
                onChange={(value) => inputTextHandler(value)}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 13 && e.target.value) {
                    searchHandler();
                  }
                }}
                placeholder="PSTH, CCIV..."
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                type="button"
                fullWidth={matchesXS || matchesXSBT}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={searchHandler}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.container}>
              Examples (hover for more info):&nbsp;
              <Tooltip title="Include 'term' in your search">
                <Typography component="span" style={{ cursor: "pointer" }}>
                  term
                </Typography>
              </Tooltip>
              ,&nbsp;
              <Tooltip title="Remove 'term' in your search">
                <Typography component="span" style={{ cursor: "pointer" }}>
                  -term
                </Typography>
              </Tooltip>
              ,&nbsp;
              <Tooltip title="Search in the community '/r/subreddit'">
                <Typography component="span" style={{ cursor: "pointer" }}>
                  /r/subreddit
                </Typography>
              </Tooltip>
              ,&nbsp;
              <Tooltip title="Search anywhere but '/r/subreddit'">
                <Typography component="span" style={{ cursor: "pointer" }}>
                  -/r/subreddit
                </Typography>
              </Tooltip>
              ,&nbsp;
              <Tooltip title="Search only links to 'example.com'">
                <Typography component="span" style={{ cursor: "pointer" }}>
                  site:example.com
                </Typography>
              </Tooltip>
              ,&nbsp;
              <Tooltip title="Search everything except for links to 'example.com'">
                <Typography component="span" style={{ cursor: "pointer" }}>
                  -site:example.com
                </Typography>
              </Tooltip>
              ,&nbsp;
              <Tooltip title="Search only content with at least 3 upvotes">
                <Typography component="span" style={{ cursor: "pointer" }}>
                  score:3
                </Typography>
              </Tooltip>
              ,&nbsp;
              <Tooltip title="Search only content made on 2015-03-15 or before">
                <Typography component="span" style={{ cursor: "pointer" }}>
                  before:2015-03-15
                </Typography>
              </Tooltip>
              ,&nbsp;
              <Tooltip title="Search only content made after 2015-03-15">
                <Typography component="span" style={{ cursor: "pointer" }}>
                  after:2015-03-15
                </Typography>
              </Tooltip>
              ,&nbsp;
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.newsbg}>
          {isFetching ? (
            <div className={classes.loading}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <div>
              {(posts || comments) && (
                <TabContext value={tabValue}>
                  <AppBar
                    position="static"
                    color="default"
                    style={{ boxShadow: "none", backgroundColor: "#fff" }}
                  >
                    <TabList
                      onChange={handleChange}
                      aria-label="reddit-list"
                      style={{ marginTop: 8 }}
                    >
                      <Tab
                        label="Posts"
                        value="1"
                        classes={{
                          root: classes.tabRoot,
                          selected: classes.selected,
                        }}
                      />
                      <Tab
                        label="Comments"
                        value="2"
                        classes={{
                          root: classes.tabRoot,
                          selected: classes.selected,
                        }}
                      />
                    </TabList>
                  </AppBar>
                  <TabPanel value="1" style={{ padding: 0 }}>
                    {posts &&
                      posts.map((row: any, index: number) => {
                        return (
                          <Card key={`posts-${index}`} className={classes.card}>
                            <div className={classes.cardContainer}>
                              <div className={classes.details}>
                                <CardHeader
                                  title={row.title}
                                  subheader={postsSubtitle(row)}
                                  classes={{
                                    title: classes.title,
                                    subheader: classes.subheader,
                                  }}
                                />
                                {row.selftext && (
                                  <CardContent>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      dangerouslySetInnerHTML={{
                                        __html: row.selftext,
                                      }}
                                    />
                                  </CardContent>
                                )}
                                <CardActions>
                                  <Button
                                    size="small"
                                    color="primary"
                                    component="a"
                                    href={row.permalink}
                                    target="_blank"
                                  >
                                    PERMALINK
                                  </Button>
                                </CardActions>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    {/* {postSortKey && <ShowMore nextList={seeMorePosts} />} */}
                  </TabPanel>
                  <TabPanel value="2" style={{ padding: 0 }}>
                    {comments &&
                      comments.map((row: any, index: number) => {
                        return (
                          <Card key={`posts-${index}`} className={classes.card}>
                            <div className={classes.cardContainer}>
                              <div className={classes.details}>
                                <CardHeader
                                  title={commentsTitle(row)}
                                  classes={{
                                    title: classes.title,
                                  }}
                                />
                                {row.body && (
                                  <CardContent>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      dangerouslySetInnerHTML={{
                                        __html: row.body,
                                      }}
                                    />
                                  </CardContent>
                                )}
                                <CardActions>
                                  <Button
                                    size="small"
                                    color="primary"
                                    component="a"
                                    href={row.permalink}
                                    target="_blank"
                                  >
                                    PERMALINK
                                  </Button>
                                </CardActions>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    {/* {commentSortKey && <ShowMore nextList={seeMoreComments} />} */}
                  </TabPanel>
                </TabContext>
              )}
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default container(Reddit);
