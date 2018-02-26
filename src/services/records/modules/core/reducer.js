import { createReducer } from 'redux-act';
import {
  create,
  load,
} from './actions';

// default state
export const defaultState = {
  records: [],
};

const handlerCreate = (state, payload, { loading, error }) => {

  if (loading || error) return state;

  return {
    ...state,
    records: [...state.records, payload.result],
  };

};

const HandlerLoad = (state, payload, { loading, error }) => {

  if (loading || error) return state;

  return {
    ...state,
    records: payload.result,
  };

};

// reducer
export default createReducer({
  [create]: handlerCreate,
  [load]: HandlerLoad,
}, defaultState);
