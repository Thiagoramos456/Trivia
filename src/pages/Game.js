/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import {
  player as playerAction,
  fetchAPI,
  answerQuestion as answerQuestionAction,
} from '../redux/actions';
import createInitialLocalStorage from '../helpers/createLocalStorage';
import Buttons from '../components/Buttons';
import '../Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      answerTimeSeconds: 30,
      timeIsOver: false,
      showNextButton: false,
      qIndex: 0,
    };

    this.getTokenFromStateOrLS = this.getTokenFromStateOrLS.bind(this);
    this.startAnswerTimer = this.startAnswerTimer.bind(this);
    this.stopAnswerTimer = this.stopAnswerTimer.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.enableNextQuestionButton = this.enableNextQuestionButton.bind(this);
    this.getAnswerClassName = this.getAnswerClassName.bind(this);
  }

  async componentDidMount() {
    await this.getTokenFromStateOrLS();
    this.startAnswerTimer();
    createInitialLocalStorage(this.props);
  }

  componentDidUpdate() {
    const { answerTimeSeconds } = this.state;
    const TIME_LIMIT = -1;

    if (answerTimeSeconds === TIME_LIMIT) {
      this.stopAnswerTimer();
      this.wrongAnswer();
    }
  }

  async getTokenFromStateOrLS() {
    const { fetchAPIAction } = this.props;
    const { token } = this.props;
    if (token) {
      fetchAPIAction(token);
    } else {
      const tokenFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
      const tokenLS = tokenFromLocalStorage('token');
      fetchAPIAction(tokenLS);
    }
  }

  getCleanText(text) {
    const innerHTML = { __html: text };
    return innerHTML;
  }

  getDifficultyValue({ difficulty }) {
    const POINTS_HARD = 3;
    const POINTS_MEDIUM = 2;
    const POINTS_EASY = 1;

    if (difficulty === 'hard') return POINTS_HARD;
    if (difficulty === 'medium') return POINTS_MEDIUM;
    if (difficulty === 'easy') return POINTS_EASY;
  }

  getAnswerClassName(answered, isCorrect) {
    if (answered && isCorrect) {
      return 'fas fa-check-circle bg-green qAnswer';
    } if (answered && isCorrect === false) {
      return 'fas fa-times-circle bg-red qAnswer';
    }
    return 'far fa-circle qAnswer';
  }

  wrongAnswer() {
    const { qIndex } = this.state;
    const { answerQuestion } = this.props;
    this.enableNextQuestionButton();
    answerQuestion({ qIndex, isCorrect: false });
  }

  rightAnswer({ data }) {
    const { answerTimeSeconds, qIndex } = this.state;
    const {
      login: { name, email: gravatarEmail },
      answerQuestion,
    } = this.props;
    const { updatePlayerInfo, player } = this.props;
    const BASE_VALUE = 10;
    const difficultyValue = this.getDifficultyValue(data[0]);
    const score = BASE_VALUE + answerTimeSeconds * difficultyValue;

    const updatedPlayer = {
      name,
      assertions: player.assertions + 1,
      score: player.score + score,
      gravatarEmail,
    };

    const state = { player: updatedPlayer };

    localStorage.setItem('state', JSON.stringify(state));
    updatePlayerInfo(updatedPlayer);
    this.enableNextQuestionButton();
    this.setState({ timeIsOver: true });
    answerQuestion({ qIndex, isCorrect: true });
  }

  startAnswerTimer() {
    const ONE_SECOND_MILLISECONDS = 1000;
    const ONE_SECOND = 1;

    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        answerTimeSeconds: prevState.answerTimeSeconds - ONE_SECOND,
      }));
    }, ONE_SECOND_MILLISECONDS);
  }

  stopAnswerTimer() {
    this.setState({ answerTimeSeconds: 0, timeIsOver: true }, () => {
      clearInterval(this.intervalID);
    });
  }

  goToNextQuestion() {
    const { qIndex } = this.state;
    const { history } = this.props;
    const MAX_QUESTION_NUMBER = 4;
    if (qIndex < MAX_QUESTION_NUMBER) {
      return this.setState((prevState) => ({
        qIndex: prevState.qIndex + 1,
        answerTimeSeconds: 30,
        timeIsOver: false,
      }));
    }
    history.push('/feedback');
  }

  enableNextQuestionButton() {
    this.setState({ showNextButton: true });
    this.setState({ timeIsOver: true });
  }

  render() {
    const { isLoading, data, questionsProgress } = this.props;
    const { answerTimeSeconds, timeIsOver, showNextButton, qIndex } = this.state;
    return (
      <>
        <Header />
        {data.length && (
          <div className="container mt-5">
            <h1 data-testid="question-category">{data[qIndex].category}</h1>
            <h2
              data-testid="question-text"
              className="text-center"
              dangerouslySetInnerHTML={ this.getCleanText(data[qIndex].question) }
            />
            <h3 className="my-4 text-center">
              {`Tempo restante: ${answerTimeSeconds} segundos`}
            </h3>
            <ol className="list-group list-unstyled">
              {data[qIndex].shuffledAnswers.map(({ correct, id, name }) => (
                <li key={ id } className={ timeIsOver ? 'animated pulse infinite' : '' }>
                  <Buttons
                    disabled={ timeIsOver }
                    testId={ correct ? 'correct-answer' : `wrong-answer-${id}` }
                    text={ name }
                    onClick={
                      correct
                        ? () => this.rightAnswer(this.props)
                        : () => this.wrongAnswer()
                    }
                    style={
                      correct
                        ? { border: timeIsOver && '3px solid rgb(6, 240, 15)' }
                        : { border: timeIsOver && '3px solid rgb(255, 0, 0)' }
                    }
                  />
                </li>
              ))}
            </ol>
            {showNextButton && (
              <Buttons
                testId="btn-next"
                text="Próxima"
                onClick={ this.goToNextQuestion }
              />
            )}
            <div className="d-flex justify-content-center">
              {questionsProgress.map(({ isCorrect, answered, question }) => (
                <i key={ question } className={ this.getAnswerClassName(answered, isCorrect) } />
              ))}
            </div>
          </div>
        )}
        {isLoading && <Loading />}
      </>
    );
  }
}

Game.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchAPIAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  player: PropTypes.objectOf(PropTypes.object).isRequired,
  updatePlayerInfo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
  isLoading: state.gameData.isLoading,
  token: state.tokenReducer.token.token,
  data: state.gameData.data,
  player: state.gameData.player,
  questionsProgress: state.gameData.questionsProgress,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPIAction: (token) => dispatch(fetchAPI(token)),
  updatePlayerInfo: (player) => dispatch(playerAction(player)),
  answerQuestion: (qIndex) => dispatch(answerQuestionAction(qIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
