import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import ForgotPasswordPage from "@views/ForgotPassword/ForgotPassword.component";
import PublicRoute from "src/HOC/publicRoute";
import PrivateRoute from "src/HOC/privateRoute";

const ForgotPassword: NextPage = () => {
  return (
    <>
      <WithLayout component={ForgotPasswordPage} layout={Main} />
    </>
  );
};

export default PrivateRoute(ForgotPassword);
