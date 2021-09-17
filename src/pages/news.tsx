import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import NewsPage from "@views/News";

const News: NextPage = () => {
  return (
    <>
      <WithLayout component={NewsPage} layout={Main} />
    </>
  );
};

export default News;
