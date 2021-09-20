import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import ProfilePage from "@views/Profile";

const Profile: NextPage = () => {
  return (
    <>
      <WithLayout component={ProfilePage} layout={Main} />
    </>
  );
};

export default Profile;
