import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Container,
  Grid,
  // TextField,
  // Tooltip,
  // useMediaQuery,
  useTheme,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import TabPanel from "@material-ui/lab/TabPanel";
import { formatDateTimeHourMilliseconds } from "src/common/utils";
// import ShowMore from 'src/common/ShowMore';
import container from "./Reddit.container";
import { IRedditState } from "src/interface/";

const useStyles = makeStyles((theme: any) =>
  createStyles({
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
      [theme.breakpoints.between("599", "750")]: {
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
  })
);

interface IRedditProps {
  redditState: IRedditState;
  onFetchTopRedditQuery: () => void;
  onFetchPostsStart: (query: string) => void;
  onFetchCommentsStart: (query: string) => void;
}
const Reddit = (props: IRedditProps) => {
  const classes = useStyles();
  const theme = useTheme();
  // const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  // const matchesXSBT = useMediaQuery(theme.breakpoints.between('599', '750'));
  const {
    redditState: {  topList, isFetching, posts, comments },
    onFetchTopRedditQuery,
    onFetchPostsStart,
    onFetchCommentsStart,
  } = props;
  // const [searchInput, setSearchInput] = React.useState(null);
  const [tabValue, setTabValue] = React.useState("1");

  React.useEffect(() => {
    onFetchTopRedditQuery();
  }, []);

  React.useEffect(() => {
    if (topList) {
      onFetchPostsStart(topList[0]);
      onFetchCommentsStart(topList[0]);
    }
  }, [topList]);

  const selectRedditQuery = (events: any) => {
    if (events.currentTarget.value) {
      console.log("events.currentTarget.value: ", events.currentTarget.value);
      onFetchPostsStart(events.currentTarget.value);
      onFetchCommentsStart(events.currentTarget.value);
    }
  };

  const handleChange = (event: any, newTab: string) => {
    setTabValue(newTab);
  };

  // const inputTextHandler = (event) => {
  //   setSearchInput(event.target.value);
  // };
  //
  // const searchHandler = () => {
  //   console.log('searchInput: ', searchInput);
  //   if (searchInput) {
  //     onFetchPostsStart(searchInput, '');
  //     onFetchCommentsStart(searchInput, '');
  //   }
  // };
  //
  // const seeMorePosts = () => {
  //   onFetchPostsStart(searchInput, postSortKey);
  // };
  //
  // const seeMoreComments = () => {
  //   onFetchCommentsStart(searchInput, commentSortKey);
  // };
  interface IRedditPostComment {
    subredditName: string;
    created_utc: string;
    sentiment?: number;
  }
  const postsSubtitle = (props: IRedditPostComment) => {
    return (
      <Typography component="h2" className={classes.subheader}>
        <Typography component="span" style={{ textTransform: "uppercase" }}>
          {props.subredditName ? `R/${props.subredditName}` : ""}
        </Typography>
        <Typography component="span" style={{ color: "rgba(0, 0, 0, 0.54)" }}>
          {`, ${formatDateTimeHourMilliseconds(props.created_utc)}`}
        </Typography>
      </Typography>
    );
  };

  const commentsTitle = (props: IRedditPostComment) => {
    return (
      <Typography component="h2">
        <Typography component="span" style={{ textTransform: "uppercase" }}>
          {props.subredditName ? `R/${props.subredditName}` : ""}
        </Typography>
        <Typography component="span" style={{ color: "rgba(0, 0, 0, 0.54)" }}>
          {`, ${formatDateTimeHourMilliseconds(props.created_utc)}`}
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

  // React.useEffect(() => {
  //   setSearchInput(query);
  // }, [query])

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Grid className={classes.newsbg}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              className={classes.rssContainer}
              style={{ color: "rgb(202 202 202)" }}
            >
              {topList.map((value) => {
                return (
                  <Button
                    variant="outlined"
                    style={{ margin: "0px 5px" }}
                    value={value}
                    onClick={selectRedditQuery}
                  >
                    {value}
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
            <div>
              {(posts.length !== 0 || comments.length !== 0) && (
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
                      posts.map((row:any, index:number) => {
                        let desc = row.selftext;
                        if (desc === "[removed]" || desc === "[deleted]") {
                          desc = "";
                        }
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
                                {desc && (
                                  <CardContent>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      dangerouslySetInnerHTML={{ __html: desc }}
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
                  </TabPanel>
                  <TabPanel value="2" style={{ padding: 0 }}>
                    {comments &&
                      comments.map((row:any, index:number) => {
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
