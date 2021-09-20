import { RootState } from "src/store/";
import { connect } from "react-redux";
import { showSnackbarNotification } from "src/store/notification/notification.actions";

const mapStateToProps = (state: RootState) => ({
  authState: state.auth,
});

const mapDispatchToProps = (dispatch: any) => ({
  onShowNotification: (status: string, message: string) =>
    dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
