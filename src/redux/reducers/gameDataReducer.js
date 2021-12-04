/* eslint-disable max-lines-per-function */
import {
  FETCH_API_SUCCESS,
  FETCH_API_FAILED,
  LOADING,
  PLAYER,
  RESET_PLAYER,
  ANSWER_QUESTION,
} from '../actions';

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
  questionsProgress: [],
};

const gameDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING:
    return {
      ...state,
      isLoading: action.payload,
    };
  case FETCH_API_SUCCESS: {
    const questions = action.payload;
    console.log(questions);
    const questionsProgress = questions.map(({ question }) => ({
      answered: false,
      isCorrect: null,
      question,
    }));
    return {
      ...state,
      data: questions,
      isLoading: false,
      questionsProgress,
    };
  }
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
  case ANSWER_QUESTION: {
    const { questionsProgress } = state;
    const { qIndex, isCorrect } = action.payload;
    const updatedQuestionsProgress = [...questionsProgress];

    updatedQuestionsProgress[qIndex].answered = true;
    updatedQuestionsProgress[qIndex].isCorrect = isCorrect;
    console.log(updatedQuestionsProgress);

    return {
      ...state,
      questionsProgress: updatedQuestionsProgress,
    };
  }
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
