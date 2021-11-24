import { GET_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:

    return state;
  default:
    return state;
  }
};

export default login;
