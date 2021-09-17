/* eslint-disable implicit-arrow-linebreak */
import { RootState } from 'src/store/';
import { connect } from 'react-redux';
import { fetchNewsStart, readMoreRedirect } from 'src/store/news/news.actions';

const mapStateToProps = (state:RootState) => ({
  newsState: state.news,
});

const mapDispatchToProps = (dispatch:any) => ({
  onFetchNewsStart: () => dispatch(fetchNewsStart()),
  onReadMoreRedirect: (url:string) => dispatch(readMoreRedirect(url))
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
