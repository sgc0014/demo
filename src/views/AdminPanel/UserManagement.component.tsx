import React from "react";
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  CardHeader,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  AccountCircle as AccountCircleIcon,
  VerifiedUser as VerifiedUserIcon,
  CardMembership as CardMembershipIcon,
} from "@material-ui/icons";
import { formatDate, formatDateTimeMilliseconds } from "src/common/utils";
import { CardBox } from "./components";
import container from "./UserManagement.container";
import TablePaginationActions from "src/components/TablePaginationActions";
import { IAdminState, IAuth } from "src/interface";

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: 600,
    padding: "35px 0px",
    background: theme.palette.white,
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px 30px 0px",
    },
  },
  typography: {
    fontSize: 25,
    textTransform: "none",
  },
  card: {
    padding: "16px 0px",
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
    marginTop: 30,
    borderRadius: "5px 5px 0 0",
  },
  loading: {
    width: "100%",
    marginTop: "3em",
    marginBottom: "3em",
  },
  link: {
    color: "#4787ed",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: "#154782",
    },
  },
  actionBtn: {
    minWidth: 0,
    borderRadius: 4,
    color: "#ffffff",
    padding: "6px 10px",
    background: "rgb(1 60 108);",
    "&:hover": {
      background: "rgb(2 79 142)",
    },
    [theme.breakpoints.down("lg")]: {
      marginBottom: 5,
    },
  },
  textLabel: {
    color: "#b1acac",
    fontSize: 15,
  },
  caption: {
    display: "none",
  },
}));

interface IUserManagementProps {
  adminState: IAdminState;
  authState:IAuth;
  onFetchUserStart: () => void;
}
const UserManagement = (props: IUserManagementProps) => {
  const classes = useStyles();
  const {
    authState:{isAuthenticated},
    adminState: {
      loading,
      users,
      counts: { total, verified, subscribed },
    },
    onFetchUserStart,
    // onSendEmail,
    // onSendSMS,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(null);
  const userList = Object.keys(users);
  let user = null;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const sendEmail = (e) => {
  //   const userid = e.currentTarget.value;
  //   onSendEmail(userid);
  // };
  //
  // const sendSMS = (e) => {
  //   const userid = e.currentTarget.value;
  //   onSendSMS(userid);
  // };

  const handleClickOpen = (e: any) => {
    setOpenUser(e.currentTarget.value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (openUser) {
    // user = users.find((x) => x.id === openUser);
    user = users[openUser];
  }

  React.useEffect(() => {
    if (!Object.keys(users).length) {
      onFetchUserStart();
    }
  }, [onFetchUserStart, users,isAuthenticated]);

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Grid style={{ margin: "2% 0" }}>
          <Typography
            component="span"
            gutterBottom
            className={classes.typography}
          >
            Admin Panel
          </Typography>{console.log(loading)}
          {loading ? (
            <div className={classes.loading}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              <Grid container spacing={3} className={classes.card}>
                <Grid item xs={6} md={4}>
                  <CardBox
                    name="Users"
                    Icon={AccountCircleIcon}
                    data={total}
                    subtitle="Total no. of users"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <CardBox
                    name="Verified"
                    Icon={VerifiedUserIcon}
                    data={verified}
                    subtitle="Total no. of verified users"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <CardBox
                    name="Subscribed"
                    Icon={CardMembershipIcon}
                    data={subscribed}
                    subtitle="Total no. of subscribed users"
                  />
                </Grid>
              </Grid>
              <Grid>
                <CardHeader
                  title="User Management"
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
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Email Alert</TableCell>
                        <TableCell>SMS Alert</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((id, index) => {
                          const status = users[id]?.subscriptionStatus;
                          let from = null;
                          let to = null;
                          if (status === "active") {
                            from = users[id]?.current_period_start;
                            to = users[id]?.current_period_end;
                          } else if (
                            status === "trialing" ||
                            status === "canceled"
                          ) {
                            from = users[id]?.trial_start;
                            to = users[id]?.trial_end;
                          }
                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow hover key={`user-${index}`}>
                              <TableCell>
                                {users[id]?.firstname} {users[id]?.lastname}
                              </TableCell>
                              <TableCell>{users[id]?.email}</TableCell>
                              <TableCell>{users[id]?.phone}</TableCell>
                              <TableCell>
                                {formatDate(users[id]?.createdAt)}
                              </TableCell>
                              <TableCell
                                style={{ textTransform: "capitalize" }}
                              >
                                {users[id]?.subscriptionId
                                  ? users[id]?.subscriptionStatus
                                  : "Not Subscribed"}
                              </TableCell>
                              <TableCell>
                                {from ? formatDateTimeMilliseconds(from) : "-"}
                              </TableCell>
                              <TableCell>
                                {to ? formatDateTimeMilliseconds(to) : "-"}
                              </TableCell>
                              <TableCell>
                                <Checkbox
                                  checked={users[id]?.emailAlert}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "email-alert-checkbox",
                                  }}
                                  disabled
                                />
                              </TableCell>
                              <TableCell>
                                <Checkbox
                                  checked={users[id]?.smsAlert}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "email-alert-checkbox",
                                  }}
                                  disabled
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="contained"
                                  color="default"
                                  className={classes.actionBtn}
                                  onClick={handleClickOpen}
                                  value={users[id]?.id}
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[25, 50, 75]}
                  component="div"
                  count={userList.length}
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
                {user && (
                  <Dialog
                    open={open}
                    fullWidth
                    maxWidth="md"
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      View Details
                    </DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              component="span"
                              className={classes.textLabel}
                            >
                              Name
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography component="span">
                              {user?.firstname} {user?.lastname}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              component="span"
                              className={classes.textLabel}
                            >
                              Email
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography component="span">
                              {user?.email}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              component="span"
                              className={classes.textLabel}
                            >
                              Phone
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography component="span">
                              {user?.phone}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              component="span"
                              className={classes.textLabel}
                            >
                              Status
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography component="span">
                              {user?.subscriptionId
                                ? "Subscribed"
                                : "Not Subscribed"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              component="span"
                              className={classes.textLabel}
                            >
                              Email Alert
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Checkbox
                              checked={user?.emailAlert}
                              color="primary"
                              inputProps={{
                                "aria-label": "email-alert-checkbox",
                              }}
                              disabled
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              component="span"
                              className={classes.textLabel}
                            >
                              SMS Alert
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Checkbox
                              checked={user?.emailAlert}
                              color="primary"
                              inputProps={{
                                "aria-label": "email-alert-checkbox",
                              }}
                              disabled
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        color="primary"
                        style={{ color: "rgb(1 60 108)" }}
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default container(UserManagement);
