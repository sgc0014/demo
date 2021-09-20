import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import PaymentFailedPage from "@views/PaymentFailed";
import { Minimal } from "src/layouts";

const PaymentFailed: NextPage = () => {
  return (
    <>
      <WithLayout component={PaymentFailedPage} layout={Minimal}  disableMenu={true} />
    </>
  );
};

export default PaymentFailed;
