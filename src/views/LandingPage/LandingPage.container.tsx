import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  
});

const container = connect(mapStateToProps);

export default container;
