import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import SimpleBackdrop from "src/common/OverlayLoading";
import { useRouter } from "next/router";
import { RootState } from "src/store/";
import { setPathname } from "src/store/siteCoordinator/siteCoordinator.actions";

const UnsubscribeRoute = (Component: any) => {
  const HOCComponent = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { isAuthenticated, loading } = useSelector(
      (state: RootState) => state.auth
    );

    const { loading: profileLoading, subscriptionLoading } = useSelector(
      (state: RootState) => state.user
    );

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
      if (!isAuthenticated) {
        // not logged in so redirect to login page with the return url
        router.push("/login");
      }
    }, []);

    if (loading || profileLoading || subscriptionLoading) {
      return <SimpleBackdrop open />;
    }

    return <Component />;
  };

  return HOCComponent;
};

UnsubscribeRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  auth: PropTypes.object.isRequired,
  onSetPathname: PropTypes.func.isRequired,
};

export default UnsubscribeRoute;
