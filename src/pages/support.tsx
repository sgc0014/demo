import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Minimal } from "src/layouts";
import SupportPage from "@views/SupportPage";
import Head from "next/head";

const Support: NextPage = () => {
  return (
    <>
      <Head>
        <title>Support | SPACrun</title>
        <meta
          name="description"
          content="Need help? Check out the SPACrun support page for answers to you question. Feel free to reach out in case you need us."
        />
      </Head>
      <WithLayout component={SupportPage} layout={Minimal} noFooter={true} />
    </>
  );
};

export default Support;
