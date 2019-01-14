import { FETCH_VIDEOS } from '../constants/actionTypes';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../actions/asyncActions';
import firebase from '../config/firebase';

export const fetchVideos = () => async dispatch => {
  let videos = [];
  const firestore = firebase.firestore();

  try {
    dispatch(asyncActionStart());

    const querySnapshot = await firestore.collection('videos').limit(50).get();

    await querySnapshot.forEach(doc => {
      videos.push(doc.data());
    });

    dispatch({ type: FETCH_VIDEOS, payload: { videos } });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
}