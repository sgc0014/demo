import React from "react";
import {
  Card,
  CardHeader,
  Paper,
  makeStyles,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  Button,
  Checkbox,
  Tooltip,
  TablePagination,
} from "@material-ui/core";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import { formatDate } from "src/common/utils";
import container from "./Following.container";
import TablePaginationActions from "src/components/TablePaginationActions";
import { IUserHistoryState, IUserState } from "src/interface";

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: 600,
    padding: "35px 0px",
    background: theme.palette.white,
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px 30px 0px",
    },
  },
  header: {
    backgroundColor: "white",
    color: theme.palette.primary.dark,
  },
  title: {
    fontWeight: 500,
  },
  subHeader: {
    marginLeft: "20px",
    color: theme.palette.primary.dark,
  },
  tableHeader: {
    color: "rgb(255 255 255)",
    backgroundColor: "rgb(1 60 108);",
    // backgroundColor: '#cccccc87',
  },
  link: {
    color: "rgb(1 60 108);",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: "rgb(2 79 142)",
    },
  },
  checked: {
    "&.Mui-checked": {
      color: "rgb(1 60 108)",
    },
  },
  disabledChecked: {
    "&.Mui-checked": {
      color: "rgb(204 204 204)",
    },
  },
  caption: {
    display: "none",
  },
}));

interface IFollowingProps {
  userState: IUserState;
  userHistoryState: IUserHistoryState;
  onSPACEmailAlertStart: (value: string, emailAlert: any) => void;
  onSPACSMSAlertStart: (value: string, smsAlert: any) => void;
  onHandleUnFollow: (value: string) => void;
  onShowNotification: (status: string, message: string) => void;
}
const Following = (props: IFollowingProps) => {
  const classes = useStyles();
  const {
    userState: {
      profile: { emailAlert, smsAlert, contact },
    },
    userHistoryState: { follows, results },
    onSPACEmailAlertStart,
    onSPACSMSAlertStart,
    onHandleUnFollow,
    onShowNotification,
  } = props;
  const isEmailAlert = emailAlert;
  const isSMSAlert = smsAlert;
  const items = follows.map((id: any) => results[id]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUnFollow = (e: any) => {
    const name = e.currentTarget.value;
    onHandleUnFollow(name);
    onShowNotification("success", `${name} unfollowed successfully.`);
  };

  const handleEmailAlert = (event: any, symbol: any, alertValue: any) => {
    onShowNotification(
      "success",
      `Email alert set successfully for ${symbol}.`
    );
    onSPACEmailAlertStart(symbol, !alertValue);
    if (alertValue) {
      onShowNotification(
        "success",
        `Email alert removed successfully for ${symbol}.`
      );
    } else {
      onShowNotification(
        "success",
        `Email alert set successfully for ${symbol}.`
      );
    }
  };

  const handleSMSAlert = (event: any, symbol: string, alertValue: any) => {
    onSPACSMSAlertStart(symbol, !alertValue);
    if (alertValue) {
      onShowNotification(
        "success",
        `SMS alert removed successfully for ${symbol}.`
      );
    } else {
      onShowNotification(
        "success",
        `SMS alert set successfully for ${symbol}.`
      );
    }
  };

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Card style={{ marginTop: "2%" }}>
          <CardHeader
            title="Following SPAC List"
            classes={{
              root: classes.header,
              title: classes.title,
              subheader: classes.subHeader,
            }}
            titleTypographyProps={{
              display: "inline",
            }}
            subheaderTypographyProps={{
              display: "inline",
            }}
            className={classes.tableHeader}
          />
          <TableContainer component={Paper} style={{ boxShadow: "none" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Following Date</TableCell>
                  <TableCell>Email Alert</TableCell>
                  <TableCell>SMS Alert</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items &&
                  items
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((value, index) => {
                      // const item = rows.find((x) => x.Symbol === value.symbol);
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <TableRow hover key={index}>
                          <TableCell>{value.symbol}</TableCell>
                          <TableCell>
                            <Link href={`/view/${value.symbol}`}>
                              <Typography className={classes.link}>
                                {value.name || ""}
                              </Typography>
                            </Link>
                          </TableCell>
                          <TableCell>{formatDate(value.createdAt)}</TableCell>
                          <TableCell>
                            <Tooltip title="Email Alert">
                              {!isEmailAlert ? (
                                <Checkbox
                                  className={classes.disabledChecked}
                                  checked={value?.emailAlert}
                                  color="default"
                                  inputProps={{
                                    "aria-label": "email-alert-checkbox",
                                  }}
                                  disabled={!isEmailAlert}
                                />
                              ) : (
                                <Checkbox
                                  className={classes.checked}
                                  checked={value?.emailAlert}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "email-alert-checkbox",
                                  }}
                                  disabled={!isEmailAlert}
                                  onClick={(e) =>
                                    handleEmailAlert(
                                      e,
                                      value?.symbol,
                                      value?.emailAlert
                                    )
                                  }
                                />
                              )}
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="SMS Alert">
                              {!isSMSAlert || !contact ? (
                                <Checkbox
                                  className={classes.disabledChecked}
                                  checked={value?.smsAlert}
                                  color="default"
                                  inputProps={{
                                    "aria-label": "email-alert-checkbox",
                                  }}
                                  disabled={!isSMSAlert || !contact}
                                />
                              ) : (
                                <Checkbox
                                  className={classes.checked}
                                  checked={value?.smsAlert}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "email-alert-checkbox",
                                  }}
                                  disabled={!isSMSAlert}
                                  value={value.symbol}
                                  onClick={(e) =>
                                    handleSMSAlert(
                                      e,
                                      value?.symbol,
                                      value?.smsAlert
                                    )
                                  }
                                />
                              )}
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Button
                              className={classes.link}
                              value={value.symbol}
                              onClick={(e) => handleUnFollow(e)}
                            >
                              Unfollow
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <TablePagination
          rowsPerPageOptions={[25, 50, 75]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          classes={{
            caption: classes.caption,
            selectRoot: classes.caption,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Container>
    </div>
  );
};

export default container(Following);
