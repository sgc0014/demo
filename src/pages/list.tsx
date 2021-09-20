import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import SPACListPage from "@views/SPACList";

const SPACList: NextPage = () => {
  return (
    <>
      <WithLayout component={SPACListPage} layout={Main} />
    </>
  );
};

export default SPACList;
