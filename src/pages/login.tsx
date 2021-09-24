import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Minimal } from "src/layouts";
import SignInPage from "@views/SignIn";
import PublicRoute from "src/HOC/publicRoute";

const LogIn: NextPage = () => {
  return (
    <>
      <WithLayout component={SignInPage} layout={Minimal} />
    </>
  );
};

export default PublicRoute(LogIn);
