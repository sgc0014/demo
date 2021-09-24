import WithLayout from "@components/WithLayout";
import DashboardPage from "@views/Dashboard";
import React from "react";
import PrivateRoute from "src/HOC/privateRoute";
import { Main } from "src/layouts";

const Dashboard = () => {
  return (
    <>
      <WithLayout component={DashboardPage} layout={Main} />
    </>
  );
};

export default PrivateRoute(Dashboard);

