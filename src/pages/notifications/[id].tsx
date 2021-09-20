import type { NextPage } from "next";
import React from "react";
import WithLayout from "@components/WithLayout";
import NotificationPreferencesPage from "@views/NotificationPreferences";
import { Minimal } from "src/layouts";

const NotificationPreferences: NextPage = () => {
  return (
    <>
      <WithLayout component={NotificationPreferencesPage} layout={Minimal}  disableMenu={true} />
    </>
  );
};

export default NotificationPreferences;
