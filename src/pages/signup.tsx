import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Minimal } from "src/layouts";
import SignUpPage from "@views/SignUp";
import Head from "next/head";
import PublicRoute from "src/HOC/publicRoute";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Signup | SPACrun</title>
        <meta
          name="description"
          content="Signup and get access to SPACrun with a 7 days free trial. No risk. Cancel anytime."
        />
      </Head>
      <WithLayout component={SignUpPage} layout={Minimal} />
    </>
  );
};

export default PublicRoute(SignUp);
