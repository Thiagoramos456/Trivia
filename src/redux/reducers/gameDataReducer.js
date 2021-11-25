import { FETCH_API_SUCCESS, FETCH_API_FAILED, LOADING } from '../actions';

const INITIAL_STATE = {
  data: {},
  error: {},
  isLoading: false,
};

const gameDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };
  case FETCH_API_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case FETCH_API_FAILED:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};

export default gameDataReducer;
