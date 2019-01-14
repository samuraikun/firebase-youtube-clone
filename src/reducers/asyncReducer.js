import { createReducer } from '../utils/reducerUtil';
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from '../constants/actionTypes';

const initialState = {
  loading: false
}

export const asyncActionStarted = state => {
  return {...state, loading: true}
}

export const asyncActionFinished = state => {
  return {...state, loading: false}
}

export const asyncActionError = state => {
  return {...state, loading: false}
}

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinished,
  [ASYNC_ACTION_ERROR]: asyncActionError
});