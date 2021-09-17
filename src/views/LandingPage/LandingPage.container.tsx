import { RootState } from "src/store";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  
});

const container = connect(mapStateToProps);

export default container;
