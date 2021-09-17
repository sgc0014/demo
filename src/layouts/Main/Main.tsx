import React from "react";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import { Topbar, Sidebar, Footer } from "./components";
import container from "./Main.container";
import { IAuth, IUserState } from "src/interface/";

interface IMainLayoutProps {
  authState: IAuth;
  userState: IUserState;
  siteCoordinator: {
    sidebarOpen: boolean;
  };
  onToggleSidebar: (value: boolean) => void;
  onSignoutStart: () => void;
  children: React.ReactNode;
}
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 50,
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      paddingTop: 80,
    },
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    minHeight: "81vh",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    minHeight: 700,
    marginLeft: 200,
  },
}));

const MainLayout = (props: IMainLayoutProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const {
    authState: { isAuthenticated, currentUser },
    siteCoordinator: { sidebarOpen },
    userState: {
      profile: { firstname, lastname, isAdmin, avatarUrl },
    },
    onToggleSidebar,
    onSignoutStart,
    children,
  } = props;

  if (typeof window !== "undefined" && window.wiser) {
    console.log("success wiser notify main");
    window.wiser.resetNotif(window.location.href);
  } else {
    console.log("failed wiser notify main");
  }

  const handleSidebarOpen = () => {
    onToggleSidebar(true);
  };

  const handleSidebarClose = () => {
    onToggleSidebar(false);
  };

  React.useEffect(() => {
    onToggleSidebar(!matchesSM);
  }, [onToggleSidebar, matchesSM]);

  const sidebarClickHandler = () => {
    if (matchesSM) {
      onToggleSidebar(false);
    }
  };

  return (
    <div id="main-content-area" className={classes.root}>
      <Topbar
        sidebarOpen={sidebarOpen}
        onSidebarOpen={handleSidebarOpen}
        onSidebarClose={handleSidebarClose}
      />
      {isAuthenticated && (
        <Sidebar
          open={sidebarOpen}
          onSidebarOpen={handleSidebarOpen}
          onSidebarClose={handleSidebarClose}
          clickHandler={sidebarClickHandler}
          onSignout={onSignoutStart}
          {...props}
        />
      )}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: matchesMD && sidebarOpen && isAuthenticated,
        })}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default container(MainLayout);
