import React from "react";
import clsx from "clsx";
import Link from "next/link";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  Hidden,
  IconButton,
  Typography,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { scrollToFeatures, scrollToPricing } from "../../../../common/utils";
import { Logo, Search } from "./components";
import container from "./Topbar.container";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    zIndex: theme.zIndex.modal,
  },
  toolbar: {
    minHeight: 50,
    padding: 8,
    [theme.breakpoints.down("xs")]: {
      minHeight: 106,
    },
  },
  logoContainer: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  toolbox: {
    flex: "1 1 0%",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25)
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchBox: {
    width: 160,
    marginTop: 7,
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      marginLeft: 15,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  linkContainer: {
    padding: 8,
    fontSize: 14,
    fontWeight: 400,
    textTransform: "none",
    marginRight: 20,
    marginTop: 3,
    cursor: "pointer",
    marginLeft: 150,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: {
    zIndex: 999,
  },
  termsDetails: {
    width: 224,
  },
  menuItems: {
    paddingTop: 13,
    paddingBottom: 13,
    fontFamily: "Arial",
  },
  paperColor: {
    backgroundColor: "#FFFFFF",
    color: "#363537",
    borderRadius: 2,
    marginTop: -2,
    marginLeft: -3,
    marginRight: 3,
  },
  media: {
    width: 155,
  },
  muiButtonText: {
    padding: "6px 8px",
    fontSize: "16px",
    fontWeight: 400,
    marginRight: 12,
  },
  loginBtn: {
    background: "rgb(1 60 108);",
    color: "#fff",
    marginTop: 0,
    marginLeft: 150,
    "&:hover": {
      backgroundColor: "#024f8e",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 21,
    },
  },
  browse: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  Headlink: {
    textTransform: "none",
    margin: 0,
    fontSize: 20,
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
      margin: "8px 15px 8px 15px",
    },
  },
  link: {
    color: "rgb(1 60 108);",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: "#154782",
    },
  },
}));

const Topbar = (props: any) => {
  const classes = useStyles();
  const {
    auth: { isAuthenticated },
    minimalLayout,
    disableMenu,
    sidebarOpen,
    onSidebarOpen,
    onSidebarClose,
    onSignoutStart,
    onSetDialogOpen,
    className,
    ...rest
  } = props;
  const isEarlyAccess = false;
  const [open, setOpen] = React.useState(false);
  const anchorRef:any = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(
    event:any
  ) {
    if (event.key === "Tab") {
      setOpen(false);
    }
  }

  const handleClickOpen = () => {
    onSetDialogOpen(true);
  };

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar disableGutters className={classes.toolbar}>
        <div
          style={{
            position: "fixed",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className={classes.toolbox}>
            {!minimalLayout &&
              isAuthenticated &&
              (!sidebarOpen ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onSidebarOpen}
                  className={classes.iconButton}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="close drawer"
                  onClick={onSidebarClose}
                  className={classes.iconButton}
                >
                  <CloseIcon />
                </IconButton>
              ))}
            <Logo classes={classes} {...props} />
            {isAuthenticated && (
              <div className={classes.browse}>
                <Search classes={classes} />
                <Typography
                  variant="h4"
                  className={classes.Headlink}
                  gutterBottom
                  style={{ marginTop: 8 }}
                >
                  <Link href="/list">
                    <Typography className={classes.link}>
                      Browse SPAC List
                    </Typography>
                  </Link>
                </Typography>
              </div>
            )}
          </div>
          {minimalLayout && !disableMenu && (
            <div>
              <Hidden xsDown>
                <Link href="/support">
                  <Button
                    color="inherit"
                    classes={{ text: classes.muiButtonText }}
                  >
                    Support
                  </Button>
                </Link>
                <Button
                  color="inherit"
                  component="a"
                  href="https://blog.spacrun.com/"
                  classes={{ text: classes.muiButtonText }}
                >
                  Blog
                </Button>
                <Button
                  color="inherit"
                  classes={{ text: classes.muiButtonText }}
                  onClick={() => scrollToFeatures()}
                >
                  Benefits
                </Button>
                <Button
                  color="inherit"
                  classes={{ text: classes.muiButtonText }}
                  onClick={() => scrollToPricing()}
                >
                  Pricing
                </Button>
                <Link href="/profile">
                  <Button
                    color="inherit"
                    classes={{ text: classes.muiButtonText }}
                  >
                    Account
                  </Button>
                </Link>
                {!isAuthenticated && (
                  <Link href={isEarlyAccess ? "/#" : "/signup"}>
                    <Button
                      style={{ marginRight: 30 }}
                      component={"button"}
                      classes={{ text: classes.muiButtonText }}
                      onClick={isEarlyAccess ? handleClickOpen : () => {}}
                    >
                      Free Trial
                    </Button>
                  </Link>
                )}
              </Hidden>
              <Hidden smUp>
                <IconButton
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  style={{ right: 16 }}
                >
                  <MenuIcon />
                </IconButton>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  style={{ minWidth: 100 }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow">
                            <MenuItem
                              component="a"
                              // href="https://blog.spacrun.com/"
                            >
                              Blog
                            </MenuItem>
                            {!isAuthenticated && (
                              <MenuItem  component={"button"}>
                                <Link href="/login">Login</Link>
                              </MenuItem>
                            )}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Hidden>
            </div>
          )}
          {!isAuthenticated && (
            <Hidden xsDown>
              <Link href="/login">
                <Button
                  variant="contained"
                  className={clsx(classes.linkContainer, classes.loginBtn)}
                >
                  Login
                </Button>
              </Link>
            </Hidden>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default container(Topbar);
