import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Minimal } from "src/layouts";
import PrivacyPage from "@views/PrivacyPage";

const Privacy: NextPage = () => {
  return (
    <>
      <WithLayout component={PrivacyPage} layout={Minimal}  noFooter={true} />
    </>
  );
};

export default Privacy;
