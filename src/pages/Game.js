import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { fetchAPI } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    // this.state = {  };

    this.getTokenFromLocalStorage = this.getTokenFromLocalStorage.bind(this);
  }

  async componentDidMount() {
    this.getTokenFromLocalStorage();
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

  render() {
    const { isLoading, data } = this.props;

    return (
      <>
        <Header />
        { data.results && (
          <div>
            <h1 data-testid="question-category">{data.results[0].category}</h1>
            <h2 data-testid="question-text">{data.results[0].question}</h2>
            <ol>
              {data.results[0].incorrect_answers.map((answer, index) => (
                <li key={ index }>
                  <button data-testid={ `wrong-answer-${index}` } type="button">
                    {answer}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" data-testid="correct-answer">
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
