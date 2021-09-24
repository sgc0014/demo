import React from "react";
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import SimpleBackdrop from "src/common/OverlayLoading";
import { setPathname } from "src/store/siteCoordinator/siteCoordinator.actions";
import { RootState } from "src/store/";
import { loadUserStart } from "@store/auth/auth.actions";

const PrivateRoute = (Component: any) => {
  const HOCComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { isAuthenticated, loading } = useSelector(
      (state: RootState) => state.auth
    );

    const {
      profile: { subscription, role },
      loading: profileLoading,
      subscriptionLoading,
    } = useSelector((state: RootState) => state.user);

    const { pathname: pathnameState } = useSelector(
      (state: RootState) => state.siteCoordinator
    );

    let isSubscriber;

    let pathname =
      typeof window !== "undefined" &&
      window.location.pathname.split("/").slice(1, 2).toString();
    let view =
      typeof window !== "undefined" &&
      window.location.pathname.split("/").slice(2, 3).toString();

    React.useEffect(() => {
      if (view) {
        pathname += `/${view}`;
      }

      dispatch(setPathname(pathname));

      isSubscriber = false;
      if (isAuthenticated && subscription) {
        isSubscriber = subscription.status !== "canceled" || role === "admin";
      }
    

      if (!isAuthenticated ) {
        // not logged in so redirect to login page with the return url
        router.push("/login");
      }

      if (isAuthenticated && !isSubscriber) {
        // logged in but not subscribed so redirect to profile
        router.push("/profile");
      }
    
    }, []);

    if (loading || profileLoading || subscriptionLoading) {
      return <SimpleBackdrop open />;
    }
    return <Component />;
  };
  return HOCComponent;
};

// PrivateRoute.propTypes = {
//   component: PropTypes.any.isRequired,
//   layout: PropTypes.any.isRequired,
//   path: PropTypes.string,
//   auth: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired,
//   onSetPathname: PropTypes.func.isRequired,
// };

export default PrivateRoute;
