import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SimpleBackdrop from "src/common/OverlayLoading";
import { useRouter } from "next/router";
import { RootState } from "src/store/";

const UnsubscribeRoute = (Component: any) => {
  const HOCComponent = () => {
    const router = useRouter();

    const { isAuthenticated, loading } = useSelector(
      (state: RootState) => state.auth
    );

    const { loading: profileLoading } = useSelector(
      (state: RootState) => state.user
    );

    React.useEffect(() => {
      if (!isAuthenticated) {
        // not logged in so redirect to login page with the return url
        router.push("/login");
      }
    }, []);

    if (loading) {
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
