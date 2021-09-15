import React from "react";
import Link from "next/link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  useMediaQuery,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from "@material-ui/core";
import {
  TrendingUp as TrendingUpIcon,
  Whatshot as WhatshotIcon,
  DynamicFeed as DynamicFeedIcon,
  RssFeed as RssFeedIcon,
  Reddit as RedditIcon,
  StarOutline as StarOutlineIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  PeopleAlt as PeopleAltIcon,
} from "@material-ui/icons";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Drawer from "@material-ui/core/Drawer";

interface IProps {
  open: boolean;
  onSidebarOpen: () => void;
  onSidebarClose: () => void;
  onSignout:() => void;
  authState: {
    isAuthenticated: boolean;
    // currentUser: { username: string };
  };
  // userState: {
  //   profile: {
  //     firstname: string;
  //     lastname: string;
  //     isAdmin: boolean;
  //     avatarUrl: string;
  //   };
  // };
  clickHandler: () => void;
}
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 200,
    height: "100%",
    backgroundColor: "#f5f5f5",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px, rgba(0, 0, 0, 0.1) 0px 0px 5px",
    borderRight: 0,
    overflow: "visible",
    [theme.breakpoints.up("md")]: {
      marginTop: 64,
      backgroundColor: "#f5f5f5",
    },
  },
  avatar: {
    margin: 8,
    color: "#fff",
    backgroundColor: "#ccc",
    textTransform: "capitalize",
  },
  name: {
    width: 145,
    paddingLeft: 5,
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "&:hover": {
      overflow: "visible",
    },
    fontSize: 14,
    textTransform: "none",
    cursor: "pointer",
  },
  linkContainer: {
    fontSize: 14,
    textTransform: "none",
    cursor: "pointer",
  },
  listContainer: {
    marginTop: 17,
    "&.MuiList-padding": {
      padding: 0,
      paddingBottom: 35,
    },
  },
  listItemContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 0,
    lineHeight: "16px",
    "&.Mui-selected": {
      backgroundColor: "#eaeff1",
    },
    "&:hover": {
      backgroundColor: "#eaeff1",
    },
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
      color: "#eaeff1",
    },
  },
  drawerItemText: {
    fontSize: "16px",
    color: "#3c3c3c",
  },
  drawerItemIcon: {
    minWidth: "40px",
  },
}));

const Sidebar = (props: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    open,
    onSidebarOpen,
    onSidebarClose,
    authState: {
      isAuthenticated,
      // currentUser: { username },
    },
    // userState: {
    //   profile: { firstname, lastname, isAdmin, avatarUrl },
    // },
    clickHandler,
  } = props;

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <>
      <Hidden smUp>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={open}
          onOpen={onSidebarOpen}
          onClose={onSidebarClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <DrawerItems {...props} />
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          variant={!matchesSM ? "persistent" : undefined}
          anchor="left"
          open={open}
          onClose={onSidebarClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <DrawerItems {...props} />
        </Drawer>
      </Hidden>
    </>
  );
};

const DrawerItems = (props: any) => {
  const classes = useStyles();
  const {
    authState: {
      isAuthenticated,
      currentUser: { username },
    },
    userState: {
      profile: { firstname, lastname, isAdmin, avatarUrl },
    },
    clickHandler,
  } = props;
  const name = `${firstname || ""} ${lastname || ""}`;

  return (
    <>
      <List className={classes.listContainer}>
        {isAuthenticated && (
          <div style={{ display: "flex", height: 55 }}>
            <Avatar className={classes.avatar}>{avatarUrl || "A"}</Avatar>
            <div>
              <Typography
                component="div"
                style={{ textTransform: "capitalize" }}
                className={classes.name}
              >
                {name || username.toString().split("@")[0]}
              </Typography>
              <Typography component="div" className={classes.name}>
                {username}
              </Typography>
            </div>
          </div>
        )}
        <SidebarItem
          name="Dashboard"
          to="/dashboard"
          icon={<TrendingUpIcon />}
          onClick={clickHandler}
        />
        <SidebarItem
          name="Top 10"
          to="/top"
          icon={<WhatshotIcon />}
          onClick={clickHandler}
        />
        <SidebarItem
          name="News"
          to="/news"
          icon={<DynamicFeedIcon />}
          onClick={clickHandler}
        />
        <SidebarItem
          name="RSS"
          to="/rss"
          icon={<RssFeedIcon />}
          onClick={clickHandler}
        />
        <SidebarItem
          name="Reddit"
          to="/reddit"
          icon={<RedditIcon />}
          onClick={clickHandler}
        />
        <SidebarItem
          name="Following"
          to="/following"
          icon={<StarOutlineIcon />}
          onClick={clickHandler}
        />
        {isAdmin && (
          <SidebarItem
            name="Admin Panel"
            to="/admin"
            icon={<PeopleAltIcon />}
            onClick={clickHandler}
          />
        )}
        <SidebarItem
          name="Profile"
          to="/profile"
          icon={<SettingsIcon />}
          onClick={clickHandler}
        />
        <SidebarItem
          name="Sign Out"
          to="/#"
          icon={<ExitToAppIcon />}
          onClick={() => {
            props.onSignout();
          }}
        />
      </List>
    </>
  );
};

const SidebarItem = (props: {
  icon: any;
  name: string;
  to: string;
  onClick: () => void;
}) => {
  const classes = useStyles();
  const { icon, name, to, onClick } = props;
  return (
    <>
      <Link href={to}>
        <ListItem
          button
          onClick={onClick}
          className={classes.listItemContainer}
          classes={{
            selected: classes.drawerItemSelected,
          }}
        >
          <ListItemIcon
            classes={{
              root: classes.drawerItemIcon,
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={name}
            className={classes.drawerItemText}
            disableTypography
          />
        </ListItem>
      </Link>
    </>
  );
};

export default Sidebar;
