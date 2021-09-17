/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';
import { fetchRSSStart, fetchRSSHistory } from 'src/store/rss/rss.actions';
import { showSnackbarNotification } from 'src/store/notification/notification.actions';
import { RootState } from 'src/store/';

const mapStateToProps = (state:RootState) => ({
    rssState: state.rss,
});

const mapDispatchToProps = (dispatch:any) => ({
    onFetchRSSStart: (url:string) => dispatch(fetchRSSStart(url)),
    onFetchRSSHistory: () => dispatch(fetchRSSHistory()),
    onShowNotification: (status:string, message:String) => dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
