/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';
import { RootState } from "src/store/";

const mapStateToProps = (state:RootState) => ({
    auth: state.auth,
    spacrunState: state.spacrun,
});

const container = connect(mapStateToProps);

export default container;
