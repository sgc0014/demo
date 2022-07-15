import { ThemeProvider } from '@mui/styles';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import config from '../../config';
import '../index.css';
import { wrapper } from '../store';
import theme from '../theme';

declare global {
  interface Window {
    wiser: any;
  }
}

const MyApp = (props: any) => {
  const { Component, pageProps } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Head>
        <title>Vogel</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default wrapper.withRedux(MyApp);
