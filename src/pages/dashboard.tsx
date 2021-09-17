import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import DashboardPage from "@views/Dashboard";

const Dashboard: NextPage = () => {
  return (
    <>
      <WithLayout component={DashboardPage} layout={Main} />
    </>
  );
};

export default Dashboard;
