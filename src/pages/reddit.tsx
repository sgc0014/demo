import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import RedditPage from "@views/Reddit";

const Reddit: NextPage = () => {
  return (
    <>
      <WithLayout component={RedditPage} layout={Main} />
    </>
  );
};

export default Reddit;
