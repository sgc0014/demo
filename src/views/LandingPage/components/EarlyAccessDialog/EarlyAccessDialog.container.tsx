/* eslint-disable implicit-arrow-linebreak */
import { connect } from "react-redux";
import {
  setDialogOpen,
  setMessageOpen,
  earlyAccessStart,
} from "@store/earlyAccess/earlyAccess.actions";
import { RootState } from "src/store/";

const mapStateToProps = (state: RootState) => ({
  earlyAccessState: state.earlyAccess,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetDialogOpen: (value: boolean) => dispatch(setDialogOpen(value)),
  onSetMessageOpen: (
    value: boolean,
    title: string | null,
    message: string | null
  ) => dispatch(setMessageOpen(value, title, message)),
  onEarlyAccess: (email: string) => dispatch(earlyAccessStart(email)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
