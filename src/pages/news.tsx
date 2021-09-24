import WithLayout from "@components/WithLayout";
import { wrapper } from "src/store/";
import NewsPage from "@views/News";
import type { NextPage } from "next";
import React from "react";
import PrivateRoute from "src/HOC/privateRoute";
import { Main } from "src/layouts";
import { fetchNewsStart } from "@store/news/news.actions";
import { END } from "@redux-saga/core";

const News: NextPage = () => {
  return (
    <>
      <WithLayout component={NewsPage} layout={Main} />
    </>
  );
};

export default PrivateRoute(News);

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(fetchNewsStart());

  store.dispatch(END);

  await store.sagaTask?.toPromise();
  return {
    props: {},
    revalidate: 43200,
  };
});
