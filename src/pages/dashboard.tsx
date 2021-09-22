import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import DashboardPage from "@views/Dashboard";
import privateRoute from "src/HOC/privateRoute";
import { RootState, wrapper } from "src/store/";
import { END } from "@redux-saga/core";
import { loadUserStart } from "@store/auth/auth.actions";
import { fetchSpacListStart } from "@store/spacrun/spacrun.actions";
import { GetStaticProps, GetStaticPropsResult } from "next";

const Dashboard = () => {
  return (
    <>
      <WithLayout component={DashboardPage} layout={Main} />
    </>
  );
};

export default Dashboard;

export const getStaticProps = wrapper.getStaticProps((store): any => {
  async () => {
    if (store) {
      store.dispatch(fetchSpacListStart());
      store.dispatch(END);
      await store.sagaTask?.toPromise();
    }
  };

  return {
    props: {},
  };
});
