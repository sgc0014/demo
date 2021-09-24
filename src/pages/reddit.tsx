import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import RedditPage from "@views/Reddit";
import { wrapper } from "src/store/";
import { END } from "@redux-saga/core";
import { fetchTopRedditQueryStart } from "@store/reddit/reddit.actions";
import PrivateRoute from "src/HOC/privateRoute";

const Reddit: NextPage = () => {
  return (
    <>
      <WithLayout component={RedditPage} layout={Main} />
    </>
  );
};

export default PrivateRoute(Reddit);

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(fetchTopRedditQueryStart());

  store.dispatch(END);
  await store.sagaTask?.toPromise();
  return {
    props: {},
    revalidate: 43200,
  };
});
