import { createReducer } from '../utils/reducerUtil';
import { FETCH_VIDEOS } from '../constants/actionTypes';

const initialState = [];

export const fetchVideos = (state, payload) => {
  return payload.videos
}

export default createReducer(initialState, {
  [FETCH_VIDEOS]: fetchVideos
});
