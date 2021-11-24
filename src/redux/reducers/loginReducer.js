import convertToMd5 from '../../helpers/crypto-js';
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatarImage: '',
  score: 0,
  logged: false,
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN: {
    const emailHash = convertToMd5(action.payload.email);
    const gravatarImage = `https://www.gravatar.com/avatar/${emailHash}`;
    return { ...state, ...action.payload, logged: true, gravatarImage };
  }
  default:
    return state;
  }
};

export default login;
