import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import { Main } from "src/layouts";
import UserManagementPage from "@views/AdminPanel/UserManagement.component";

const Admin: NextPage = () => {
  return (
    <>
      <WithLayout component={UserManagementPage} layout={Main} />
    </>
  );
};

export default Admin;
