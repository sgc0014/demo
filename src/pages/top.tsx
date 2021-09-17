import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import Top10Page from "@views/Top10";

const Top: NextPage = () => {
  return (
    <>
      <WithLayout component={Top10Page} layout={Main} />
    </>
  );
};

export default Top;
