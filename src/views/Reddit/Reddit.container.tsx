/* eslint-disable implicit-arrow-linebreak */
import { RootState } from 'src/store/';
import { connect } from 'react-redux';
// import { showSnackbarNotification } from 'src/store/notification/notification.actions';
import { fetchTopRedditQueryStart, fetchPostsStart, fetchCommentsStart } from 'src/store/reddit/reddit.actions';


const mapStateToProps = (state:RootState) => ({
  redditState: state.reddit,
});

const mapDispatchToProps = (dispatch:any) => ({
  onFetchTopRedditQuery: () => dispatch(fetchTopRedditQueryStart()),
  onFetchPostsStart: (query:string) => dispatch(fetchPostsStart(query)),
  onFetchCommentsStart: (query:string) => dispatch(fetchCommentsStart(query)),
  // onShowNotification: (status, message) => dispatch(showSnackbarNotification(status, message)),
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
