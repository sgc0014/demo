import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import SignInPage from "@views/SignIn";

const LogIn: NextPage = () => {
  return (
    <>
      <WithLayout component={SignInPage} layout={Main} />
    </>
  );
};

export default LogIn;
