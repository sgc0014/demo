import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import SimpleBackdrop from "src/common/OverlayLoading";
import { RootState } from "src/store/";
import { useRouter } from "next/router";

const PublicRoute = (Component: any) => {
  const HOCComponent = () => {
    const router = useRouter();
   

    const { isAuthenticated, loading } = useSelector(
      (state: RootState) => state.auth
    );

    const {
      profile: { subscription, role },
      loading: profileLoading,
    } = useSelector((state: RootState) => state.user);

    const { pathname } = useSelector(
      (state: RootState) => state.siteCoordinator
    );
    
    React.useEffect(() => {
      if (loading === false && profileLoading === false) {
        let isSubscriber = false;
        if (isAuthenticated && subscription) {
          isSubscriber = subscription.status !== "canceled" || role === "admin";
        }
     
        if (isAuthenticated && isSubscriber) {
          router.push(`/${pathname}`);
        }

        if (isAuthenticated && !isSubscriber) {
          // logged in but not subscribed so redirect to profile
          router.push("/profile");
        }
      }
    }, [profileLoading, loading]);

    if (loading || profileLoading) {
      return <SimpleBackdrop open />;
    }
    return <Component />;
  };
  return HOCComponent;
};

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  siteCoordinator: PropTypes.object.isRequired,
};

export default PublicRoute;
