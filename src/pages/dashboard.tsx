import WithLayout from "@components/WithLayout";
import { END } from "@redux-saga/core";
import { fetchSpacListStart } from "@store/spacrun/spacrun.actions";
import DashboardPage from "@views/Dashboard";
import React from "react";
import { Main } from "src/layouts";
import { wrapper } from "src/store/";

const Dashboard = () => {
  return (
    <>
      <WithLayout component={DashboardPage} layout={Main} />
    </>
  );
};

export default Dashboard;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(fetchSpacListStart());

  store.dispatch(END);

  await store.sagaTask?.toPromise();
  return {
    props: {},
  };
});
