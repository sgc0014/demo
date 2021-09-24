import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import Top10Page from "@views/Top10";
import PrivateRoute from "src/HOC/privateRoute";
import { wrapper } from "src/store/";
import { END } from "@redux-saga/core";
import { fetchTopListStart } from "@store/spacrun/spacrun.actions";

const Top: NextPage = () => {
  return (
    <>
      <WithLayout component={Top10Page} layout={Main} />
    </>
  );
};

export default PrivateRoute(Top);

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(fetchTopListStart());

  store.dispatch(END);

  await store.sagaTask?.toPromise();
  return {
    props: {},
  };
});
