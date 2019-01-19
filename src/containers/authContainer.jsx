import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import NavigationItem from '../components/NavigationItem';

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default withFirebase(connect(mapStateToProps)(NavigationItem));
