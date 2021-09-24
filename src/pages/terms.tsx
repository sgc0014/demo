import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import TermsPage from "@views/TermsPage";
import { Minimal } from "src/layouts";
import Head from "next/head";

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | SPACrun</title>
        <meta
          name="description"
          content="SPACrun terms of service ('terms') govern your access to and use of our services. Please read SPACrun terms and conditions carefully before you start using our services."
        />
      </Head>
      <WithLayout component={TermsPage} layout={Minimal} noFooter={true} />
    </>
  );
};

export default Terms;
