import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import FollowingPage from "@views/Following";

const Following: NextPage = () => {
  return (
    <>
      <WithLayout component={FollowingPage} layout={Main} />
    </>
  );
};

export default Following;
