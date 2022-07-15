import type { NextPage } from 'next';
import React from 'react';
import WithLayout from '@components/WithLayout';
import LandingPage from '@views/LandingPage';
import { Main } from 'src/layouts';
import { wrapper } from 'src/store/';
import { getApp } from '@store/app.action';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import img from 'src/index.jpeg';
const Index: NextPage = () => {
  const { app } = useSelector((state: any) => state.app);
  return (
    <>
      <Head>
        <title>Vogel | {app?.app_name}</title>
        <meta
          property="og:title"
          content={`${app?.app_name} | Vogel`}
          key="title"
        />
        <meta
          property="title"
          content={`${app?.app_name} | Vogel`}
          key="title"
        />
        <meta
          name="description"
          content={
            (app?.privacyInfo && app?.privacyInfo[0]?.description) ??
            'Vogel is a privacy-friendly app store.'
          }
        />

        <meta
          property="og:description"
          content={
            (app?.privacyInfo && app?.privacyInfo[0]?.description) ??
            'Vogel is a privacy-friendly app store.'
          }
          key="description"
        />
      </Head>
      <WithLayout component={LandingPage} layout={Main} />
    </>
  );
};

export default Index;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    if (!context) throw new Error('No path parameters found');

    // store.dispatch(fetchYachtsStart());
    store.dispatch(
      getApp({
        app_id: context.query.slug,
        app_name: context.query.name
      })
    );
    store.dispatch(END);
    await store.sagaTask?.toPromise();
    return {
      props: {}
    };
  }
);
