import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import DashboardPage from "@views/Dashboard";
import PrivateRoute from "src/HOC/privateRoute";

const View: NextPage = () => {
  return (
    <>
      <WithLayout component={DashboardPage} layout={Main} />
    </>
  );
};

export default View;
