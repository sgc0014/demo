import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Minimal } from "src/layouts";
import SupportPage from "@views/SupportPage";

const Support: NextPage = () => {
  return (
    <>
      <WithLayout component={SupportPage} layout={Minimal}  noFooter={true} />
    </>
  );
};

export default Support;
