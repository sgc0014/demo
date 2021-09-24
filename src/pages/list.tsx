import WithLayout from "@components/WithLayout";
import SPACListPage from "@views/SPACList";
import type { NextPage } from "next";
import React from "react";
import PrivateRoute from "src/HOC/privateRoute";
import { Main } from "src/layouts";

const SPACList: NextPage = () => {
  return (
    <>
      <WithLayout component={SPACListPage} layout={Main} />
    </>
  );
};

export default PrivateRoute(SPACList);
