/* eslint-disable implicit-arrow-linebreak */
import { showSnackbarNotification } from "@store/notification/notification.actions";
import { searchStart } from "@store/search/search.actions";
import { connect } from "react-redux";

import { RootState } from "../../../../../../store";

const mapStateToProps = (state: RootState) => ({
  searchState: state.search,
  spacrunState: state.spacrun,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSearchStart: (value: string, history: any) =>
    dispatch(searchStart(value, history)),
  onShowNotification: (status: string, message: string) =>
    dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
