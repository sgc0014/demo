import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import FollowingPage from "@views/Following";
import PrivateRoute from "src/HOC/privateRoute";

const Following: NextPage = () => {
  return (
    <>
      <WithLayout component={FollowingPage} layout={Main} />
    </>
  );
};

export default PrivateRoute(Following);
