import React from "react";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "next/link";

const Logo = (props: any) => {
  const {
    auth: { isAuthenticated },
    classes,
  } = props;
  return (
    <>
      {isAuthenticated ? (
        <Link href="/dashboard">
          <Button disableRipple className={classes.logoContainer}>
            <CardMedia
              alt="Image not available"
              component="img"
              className={classes.media}
              src={"/images/spacrun_logo.png"}
              // onError={onMediaFallback}
            />
          </Button>
        </Link>
      ) : (
        <Link href="/">
          <Button disableRipple className={classes.logoContainer}>
            <CardMedia
              alt="Image not available"
              component="img"
              className={classes.media}
              src={"/images/spacrun_logo.png"}
              // onError={onMediaFallback}
            />
          </Button>
        </Link>
      )}
    </>
  );
};

export default Logo;
