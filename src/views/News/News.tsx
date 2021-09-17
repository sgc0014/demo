import React, { useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
  Hidden,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShowMore from "src/common/ShowMore";
import container from "./News.container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Refresh as RefreshIcon } from "@material-ui/icons";
import { formatDate } from "src/common/utils";
import { INewsState } from "src/interface/";

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
      // padding: '8px',
      marginTop: 8,
      border: "1px solid #ccc",
      marginBottom: "1%",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      marginRight: "0%",
    },
    link: {
      color: "rgb(1 60 108);",
      fontSize: 16,
      textDecoration: "none",
      fontWeight: 500,
      lineHeight: "35px",
      cursor: "pointer",
    },
    headerRoot: {
      maxWidth: 900,
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
    },
    subheader: {
      fontSize: 16,
    },
    description: {
      color: "#000",
      textDecoration: "none",
    },
    title: {
      color: "#409bfc",
    },
    typography: {
      fontSize: 25,
      textTransform: "none",
    },
    newsbg: {
      margin: "2% 0",
      [theme.breakpoints.down("sm")]: { margin: "8% 0" },
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    cover: {
      width: 260,
      height: "auto",
      backgroundSize: "100% auto",
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

interface INewsProps {
  newsState: INewsState;
  onFetchNewsStart: () => void;
  onReadMoreRedirect: (url: string) => void;
}
const News = (props: INewsProps) => {
  const classes = useStyles();
  const {
    newsState: { isFetching, results },
    onFetchNewsStart,
    onReadMoreRedirect,
  } = props;
  const [more, setMore] = React.useState(10);
  const list = results;

  useEffect(() => {
    if (!Object.keys(results).length) {
      onFetchNewsStart();
    }
  }, [results, onFetchNewsStart]);

  const seeMoreHandler = () => {
    setMore(more + 10);
  };

  const updateNewsHandler = () => {
    onFetchNewsStart();
  };

  const headerLink = (props:any) => {
    return (
      <div
        // href={props.link}
        // target="_"
        className={classes.link}
        data-value={props.link}
        onClick={readMoreRedirectTitle}
      >
        {props.title}
      </div>
    );
  };

  const readMoreRedirectTitle = (events:any) => {
    onReadMoreRedirect(events.currentTarget.dataset.value);
  };

  const readMoreRedirect = (events:any) => {
    onReadMoreRedirect(events.currentTarget.value);
  };

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Grid className={classes.newsbg}>
          <Typography
            component="span"
            gutterBottom
            className={classes.typography}
          >
            News
            <Tooltip title="Refresh News">
              <IconButton
                aria-label="refresh"
                className={classes.margin}
                size="small"
                onClick={updateNewsHandler}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          {isFetching ? (
            <div className={classes.loading}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            list &&
            list.slice(0, more).map((row, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Card key={`news-${index}`} className={classes.card}>
                <div className={classes.container}>
                  <div className={classes.details}>
                    <CardHeader
                      title={headerLink(row)}
                      subheader={row.pubDate ? formatDate(row.pubDate) : ""}
                      classes={{
                        root: classes.headerRoot,
                        subheader: classes.subheader,
                        title: classes.title,
                      }}
                    />
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        // component="a"
                        // href={row.link}
                        // target="_blank"
                        value={row.link}
                        onClick={readMoreRedirect}
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </div>
                  <Hidden smDown>
                    {row.media ? (
                      <CardMedia
                        className={classes.cover}
                        image={row.media}
                        title={row.title}
                      />
                    ) : (
                      ""
                    )}
                  </Hidden>
                </div>
              </Card>
            ))
          )}
        </Grid>
        {!isFetching && list.length > more && (
          <ShowMore nextList={seeMoreHandler} />
        )}
      </Container>
    </div>
  );
};

export default container(News);
