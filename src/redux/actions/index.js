import shuffle from '../../helpers/shuffleArray';

export const LOGIN = 'LOGIN';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_FAILED = 'FETCH_API_FAILED';
export const LOADING = 'LOADING';
export const PLAYER = 'PLAYER';
export const RESET_STATE = 'RESET_STATE';
export const RESET_PLAYER = 'RESET_PLAYER';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export const resetState = () => ({
  type: RESET_STATE,
});

export const resetGameData = () => ({
  type: RESET_PLAYER,
});

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const token = (payload) => ({
  type: FETCH_TOKEN,
  payload,
});

export const successAPIFetch = (payload) => ({
  type: FETCH_API_SUCCESS,
  payload,
});

export const failedAPIFetch = (payload) => ({
  type: FETCH_API_FAILED,
  payload,
});

export const loading = (payload) => ({
  type: LOADING,
  payload,
});

export const player = (payload) => ({
  type: PLAYER,
  payload,
});

export const answerQuestion = (payload) => ({
  type: ANSWER_QUESTION,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return dispatch(token(data));
};

export const fetchAPI = (tokenKey) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const questionsResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenKey}`);
    const data = await questionsResponse.json();
    const updatedData = data.results.map((question) => {
      const allAnswers = [...question.incorrect_answers, question.correct_answer];
      const shuffledAnswers = shuffle(allAnswers).map((answer, id) => {
        if (answer === question.correct_answer) {
          return { name: answer, id, correct: true };
        }

        return { name: answer, id, correct: false };
      });

      const updatedItem = { ...question, shuffledAnswers };
      return updatedItem;
    });
    dispatch(successAPIFetch(updatedData));
  } catch (error) {
    dispatch(failedAPIFetch(error));
  }
};
