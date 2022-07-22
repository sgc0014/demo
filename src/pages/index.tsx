import type { NextPage } from 'next';
import React from 'react';
import WithLayout from '@components/WithLayout';
import LandingPage from '@views/ViewProduct';
import { Main } from 'src/layouts';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="bJikpTy5BTn5u9snTb7hZfh8UQXR0invGtY7K0dyObU"
        />
      </Head>
      <WithLayout component={LandingPage} layout={Main} />
    </>
  );
};

export default Index;
