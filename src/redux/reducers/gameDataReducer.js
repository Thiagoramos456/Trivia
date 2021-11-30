import { FETCH_API_SUCCESS, FETCH_API_FAILED, LOADING,
  PLAYER, RESET_PLAYER } from '../actions';

const INITIAL_STATE = {
  data: [],
  error: {},
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
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

  case PLAYER:
    return {
      ...state,
      player: action.payload,
    };

  case RESET_PLAYER:
    return {
      ...state,
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };

  default:
    return state;
  }
};

export default gameDataReducer;
