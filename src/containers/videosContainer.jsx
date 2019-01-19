import { connect } from 'react-redux';
import { fetchVideos } from '../actions/videoActions';
import VideoFeed from '../components/VideoFeed';

const mapStateToProps = state => ({
  videos: state.videos,
  loading: state.async.loading
});

const actions = {
  fetchVideos
}

export default connect(mapStateToProps, actions)(VideoFeed);
