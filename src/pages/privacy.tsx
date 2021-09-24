import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Minimal } from "src/layouts";
import PrivacyPage from "@views/PrivacyPage";
import Head from "next/head";

const Privacy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy | SPACrun</title>
        <meta
          name="description"
          content="SPACrun respects the privacy of your personal information and keeps your private data and information protected."
        />
      </Head>
      <WithLayout component={PrivacyPage} layout={Minimal} noFooter={true} />
    </>
  );
};

export default Privacy;
