import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { player as playerAction, fetchAPI } from '../redux/actions';
import createInitialLocalStorage from '../helpers/createLocalStorage';
import Buttons from '../components/Buttons';

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
  }

  async componentDidMount() {
    this.getTokenFromStateOrLS();
    this.startAnswerTimer();
    createInitialLocalStorage(this.props);
  }

  componentDidUpdate() {
    const { answerTimeSeconds } = this.state;
    const TIME_LIMIT = -1;

    if (answerTimeSeconds === TIME_LIMIT) {
      this.stopAnswerTimer();
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
    const POINTS_MEDIUM = 3;
    const POINTS_EASY = 3;

    if (difficulty === 'hard') return POINTS_HARD;
    if (difficulty === 'medium') return POINTS_MEDIUM;
    if (difficulty === 'easy') return POINTS_EASY;
  }

  goToNextQuestion() {
    this.setState((prevState) => ({
      qIndex: prevState.qIndex + 1,
      showNextButton: true,
    }));
  }

  rightAnswer({ results }) {
    const { answerTimeSeconds } = this.state;
    const { login: { name, email: gravatarEmail } } = this.props;
    const { updatePlayerInfo, player } = this.props;
    const BASE_VALUE = 10;
    const difficultyValue = this.getDifficultyValue(results[0]);
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
    console.log(updatePlayerInfo);
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

  render() {
    const { isLoading, results } = this.props;
    const { answerTimeSeconds, timeIsOver, /* showNextButton, */ qIndex } = this.state;

    return (
      <>
        <Header />
        { results && (
          <div>
            <h1 data-testid="question-category">{results[qIndex].category}</h1>
            <h2
              data-testid="question-text"
              dangerouslySetInnerHTML={ this.getCleanText(results[qIndex].question) }
            />
            <h3>
              {`Tempo restante: ${answerTimeSeconds} segundos`}
            </h3>
            <ol>
              {results[qIndex].incorrect_answers.map((answer, index) => (
                <li key={ index }>
                  <Buttons
                    disabled={ timeIsOver }
                    testId={ `wrong-answer-${index}` }
                    text={ answer }
                  />
                </li>
              ))}
              <li>
                <Buttons
                  disabled={ timeIsOver }
                  testId="correct-answer"
                  text={ results[qIndex].correct_answer }
                  onClick={ () => this.rightAnswer(this.props) }
                />
              </li>
            </ol>
            {/* {showNextButton
              && <Buttons
                testId="btn-next"
                text="Próxima"
                onClick={ this.goToNextQuestion }
              />} */}
          </div>
        )}
        {isLoading && <Loading />}
      </>
    );
  }
}

Game.propTypes = {
  results: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchAPIAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  player: PropTypes.objectOf(PropTypes.object).isRequired,
  updatePlayerInfo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
  isLoading: state.gameData.isLoading,
  token: state.tokenReducer.token.token,
  results: state.gameData.data.results,
  player: state.gameData.player,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPIAction: (token) => dispatch(fetchAPI(token)),
  updatePlayerInfo: (player) => dispatch(playerAction(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
