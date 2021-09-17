import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import RssPage from "@views/RssPage";

const Rss: NextPage = () => {
  return (
    <>
      <WithLayout component={RssPage} layout={Main} />
    </>
  );
};

export default Rss;
