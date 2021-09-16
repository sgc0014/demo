import { ThemeProvider } from "@material-ui/core/styles";
import Notifications from "@views/Notifications";
import Amplify from "aws-amplify";
import Head from "next/head";
import React, { useEffect } from "react";
import config from "../../config";
import "../index.css";
import { wrapper } from "../store";
import theme from "../theme";


declare global {
  interface Window {
    wiser: any;
  }
}

//aws configure
Amplify.configure({
  Auth: {
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

const MyApp = (props: any) => {
  const { Component, pageProps } = props;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Notifications />
      </ThemeProvider>
    </React.Fragment>
  );
};


export default wrapper.withRedux(MyApp);
