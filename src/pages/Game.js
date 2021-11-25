import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { fetchAPI } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      answerTimeSeconds: 30,
      timeIsOver: false,
    };

    this.getTokenFromLocalStorage = this.getTokenFromLocalStorage.bind(this);
    this.startAnswerTimer = this.startAnswerTimer.bind(this);
    this.stopAnswerTimer = this.stopAnswerTimer.bind(this);
  }

  async componentDidMount() {
    this.getTokenFromLocalStorage();
    this.startAnswerTimer();
  }

  componentDidUpdate() {
    const { answerTimeSeconds } = this.state;
    const TIME_LIMIT = -1;

    if (answerTimeSeconds === TIME_LIMIT) {
      this.stopAnswerTimer();
    }
  }

  async getTokenFromLocalStorage() {
    const { fetchAPIAction } = this.props;
    const { token } = this.props;
    if (token) {
      fetchAPIAction(token);
    } else {
      const tokenFromLS = (key) => JSON.parse(localStorage.getItem(key));
      const tokenLS = tokenFromLS('token');
      fetchAPIAction(tokenLS);
    }
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
    const { isLoading, data } = this.props;
    const { answerTimeSeconds, timeIsOver } = this.state;

    return (
      <>
        <Header />
        { data.results && (
          <div>
            <h1 data-testid="question-category">{data.results[0].category}</h1>
            <h2 data-testid="question-text">{data.results[0].question}</h2>
            <h3>
              Tempo restante:
              {' '}
              { answerTimeSeconds }
              {' '}
              segundos
            </h3>
            <ol>
              {data.results[0].incorrect_answers.map((answer, index) => (
                <li key={ index }>
                  <button
                    disabled={ timeIsOver }
                    data-testid={ `wrong-answer-${index}` }
                    type="button"
                  >
                    {answer}
                  </button>
                </li>
              ))}
              <li>
                <button
                  disabled={ timeIsOver }
                  type="button"
                  data-testid="correct-answer"
                >
                  {data.results[0].correct_answer}
                </button>
              </li>
            </ol>
          </div>
        )}
        {isLoading && <Loading />}
      </>
    );
  }
}

Game.propTypes = {
  data: PropTypes.objectOf({
    results: PropTypes.objectOf(PropTypes.object).isRequired,
  }).isRequired,
  fetchAPIAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.gameData.isLoading,
  token: state.tokenReducer.token.token,
  data: state.gameData.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPIAction: (token) => dispatch(fetchAPI(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
