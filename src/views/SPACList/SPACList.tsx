import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// import rows from 'src/files/15Jan2021shellcompanies.json';
import Container from "@material-ui/core/Container";
import { TableCard } from "./components";
import container from "./SPACList.container";
import { IAuth, ISpacrun, IUserHistoryState } from "src/interface";

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: 600,
    padding: "35px 0px",
    background: theme.palette.white,
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0px 30px 0px",
    },
  },
  header: {
    backgroundColor: "white",
    color: theme.palette.primary.dark,
  },
  subHeader: {
    marginLeft: "20px",
    color: theme.palette.primary.dark,
  },
}));

interface ISPACListProps {
  authState: IAuth;
  spacrunState: ISpacrun;
  onShowNotification: (status: string, message: string) => void;
  followState: IUserHistoryState;
  onUnFollow: (value: string) => void;
  onFollow: (value: string) => void;
}
const SPACList = (props: ISPACListProps) => {
  const classes = useStyles();
  const {
    authState: { isAuthenticated },
    followState: { loading, follows },
    spacrunState: { spac },
    onShowNotification,
    onUnFollow,
    onFollow,
  } = props;
  const headCells = [
    { id: "symbol", numeric: false, disablePadding: false, label: "Symbol" },
    { id: "name", numeric: false, disablePadding: false, label: "Company" },
    {
      id: "lastPrice",
      numeric: true,
      disablePadding: false,
      label: "Last Price",
    },
    {
      id: "change",
      numeric: true,
      disablePadding: false,
      label: "Price Change",
    },
    {
      id: "changePercent",
      numeric: true,
      disablePadding: false,
      label: "% Change",
    },
    { id: "volume", numeric: true, disablePadding: false, label: "Volume" },
    {
      id: "avgVolume",
      numeric: true,
      disablePadding: false,
      label: "Avg Volume",
    },
    {
      id: "marketCap",
      numeric: true,
      disablePadding: false,
      label: "Market Cap",
    },
  ];

  const followHandler = async (symbol: string) => {
    if (isAuthenticated) {
      onFollow(symbol);
      onShowNotification("success", `${symbol} followed successfully.`);
    }
  };

  const unFollowHandler = async (symbol: string) => {
    if (isAuthenticated) {
      onUnFollow(symbol);
      onShowNotification("success", `${symbol} unfollowed successfully.`);
    }
  };

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Grid>
          <TableCard
            title="SPAC List"
            headCells={headCells}
            rows={spac}
            loading={loading}
            followList={follows}
            handleFollow={followHandler}
            handleUnFollow={unFollowHandler}
          />
        </Grid>
      </Container>
    </div>
  );
};

export default container(SPACList);
