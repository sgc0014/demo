import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import ForgotPasswordPage from "@views/ForgotPassword/ForgotPassword.component";

const ForgotPassword: NextPage = () => {
  return (
    <>
      <WithLayout component={ForgotPasswordPage} layout={Main} />
    </>
  );
};

export default ForgotPassword;
