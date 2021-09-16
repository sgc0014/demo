import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import SignUpPage from "@views/SignUp";

const SignUp: NextPage = () => {
  return (
    <>
      <WithLayout component={SignUpPage} layout={Main} />
    </>
  );
};

export default SignUp;
