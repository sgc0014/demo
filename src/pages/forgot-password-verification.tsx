import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import ForgotPasswordVerificationPage from "@views/ForgotPassword/ForgotPasswordVerification";

const ForgotPassword: NextPage = () => {
  return (
    <>
      <WithLayout component={ForgotPasswordVerificationPage} layout={Main} />
    </>
  );
};

export default ForgotPassword;
