import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import TermsPage from "@views/TermsPage";
import { Minimal } from "src/layouts";

const Terms: NextPage = () => {
  return (
    <>
      <WithLayout component={TermsPage} layout={Minimal}  noFooter={true} />
    </>
  );
};

export default Terms;
