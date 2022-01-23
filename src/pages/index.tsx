import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import LandingPage from "@views/LandingPage";

const Index: NextPage = () => {
  return (
    <>
      <WithLayout component={LandingPage}  />
    </>
  );
};

export default Index;
