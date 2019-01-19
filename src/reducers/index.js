import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import asyncReducer from './asyncReducer';
import videoReducer from './videoReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  videos: videoReducer,
  async: asyncReducer
});

export default rootReducer;