import WithLayout from "@components/WithLayout";
import NewsPage from "@views/News";
import type { NextPage } from "next";
import React from "react";
import { Main } from "src/layouts";

const News: NextPage = () => {
  return (
    <>
      <WithLayout component={NewsPage} layout={Main} />
    </>
  );
};

export default News;
