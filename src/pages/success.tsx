import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import PaymentSuccessPage from "@views/PaymentSuccess";
import { Minimal } from "src/layouts";

const PaymentSuccess: NextPage = () => {
  return (
    <>
      <WithLayout component={PaymentSuccessPage} layout={Minimal}  disableMenu={true} />
    </>
  );
};

export default PaymentSuccess;
