export const LOGIN = 'LOGIN';
export const FETCH_API = 'FETCH_API';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const fetchApi = (payload) => ({
  type: FETCH_API,
  payload,
});

export const getGameToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await response.json();
  return dispatch(fetchApi(token));
};
