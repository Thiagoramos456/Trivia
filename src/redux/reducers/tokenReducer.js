import { FETCH_API } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_API:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default tokenReducer;
