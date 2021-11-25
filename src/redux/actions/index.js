export const LOGIN = 'LOGIN';
export const FETCH_TOKEN = 'FETCH_TOKEN';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const token = (payload) => ({
  type: FETCH_TOKEN,
  payload,
});

export const fetchAPI = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return dispatch(token(data));
};
