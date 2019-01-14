import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, firebaseReducer, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import firebase from './config/firebase';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
const middlewareEnhancer = applyMiddleware(...middlewares);
const storeEnhancers = [middlewareEnhancer];

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  )
);
