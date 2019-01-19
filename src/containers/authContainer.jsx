import { connect } from 'react-redux';
import NavigationItem from '../components/NavigationItem';

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(NavigationItem);
