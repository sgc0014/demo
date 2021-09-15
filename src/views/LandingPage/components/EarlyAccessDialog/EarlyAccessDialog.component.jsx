import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titleTwo: {
    fontSize: 18,
    padding: 3,
  },
  submit: {
    backgroundColor: "#013c6c",
    color: "#fff",
    margin: theme.spacing(3, 0, 2),
    minHeight: "45px",
    "&:hover": {
      backgroundColor: "#024f8e",
    },
  },
  messagePaper: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const EarlyAccessDialog = (props) => {
  const classes = useStyles();
  const {
    earlyAccessState: {
      isLoading,
      dialogOpen,
      messageOpen,
      messageTitle,
      messageContent,
    },
    onSetDialogOpen,
    onSetMessageOpen,
    onEarlyAccess,
  } = props;
  const handleClose = () => {
    onSetDialogOpen(false);
  };
  const handleMessageClose = () => {
    onSetMessageOpen(false, null, null);
  };
  const earlyAccessHandler = async (values) => {
    if (values.email) {
      onEarlyAccess(values.email);
    }
  };

  // React.useEffect(() => {
  //   if (earlyAccess.message) {
  //     onSetDialogOpen(false);
  //     onSetMessageOpen(true);
  //   }
  // }, [earlyAccess]);

  return (
    <>
      <Dialog
        open={dialogOpen}
        fullWidth
        maxWidth="sm"
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          disableTypography
          style={{ textAlign: "right", position: "absolute", right: 0 }}
        >
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className={classes.paper}>
          <Typography
            component="h3"
            variant="h5"
            className={classes.titleTwo}
            style={{ padding: "0px 35px", textAlign: "center" }}
          >
            <b>
              Join the waitlist for your private exclusive early access to
              SPACrun. The definitive source for SPAC research and alerts.
            </b>
          </Typography>
        </div>
        <div style={{ paddingBottom: 24 }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Please add your email address")
                .max(254, "Really!"),
            })}
            onSubmit={earlyAccessHandler}
          >
            <Form className={classes.form}>
              <DialogContent style={{ padding: "8px 36px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component="span" className={classes.textLabel}>
                      Email Address
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      id="email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      label="Email Address"
                      className={classes.textField}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions style={{ padding: "8px 36px" }}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Continue"}
                  </Button>
                </Grid>
              </DialogActions>
            </Form>
          </Formik>
        </div>
      </Dialog>
      <Dialog
        open={messageOpen}
        fullWidth
        maxWidth="sm"
        onClose={handleMessageClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {messageTitle}
          <IconButton
            onClick={handleMessageClose}
            style={{ textAlign: "right", position: "absolute", right: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className={classes.messagePaper}>
          <Typography component="h3" variant="h5" className={classes.titleTwo}>
            {messageContent || "Please contact support@spacrun.com"}
          </Typography>
        </div>
        <DialogActions style={{ padding: "8px 36px" }}>
          <Grid item xs={12}>
            <Button
              type="button"
              fullWidth
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={handleMessageClose}
            >
              Okay
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EarlyAccessDialog;
