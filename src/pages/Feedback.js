import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RedirectButton from '../components/RedirectButton';
import { createRankingInLocalStore } from '../helpers/createLocalStorage';

class Feedback extends Component {
  constructor() {
    super();

    this.getFeedbackMessage = this.getFeedbackMessage.bind(this);
    this.getScore = this.getScore.bind(this);
    this.getAssertions = this.getAssertions.bind(this);
  }

  componentDidMount() {
    const { login, score } = this.props;
    createRankingInLocalStore(login, score);
  }

  getScore() {
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    return score;
  }

  getAssertions() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    return assertions;
  }

  getFeedbackMessage() {
    const assertions = this.getAssertions();
    const MIN_ASSERTIONS = 3;
    return assertions < MIN_ASSERTIONS ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        <h2 data-testid="feedback-text">
          {' '}
          {this.getFeedbackMessage()}
          {' '}
        </h2>
        <h2 data-testid="feedback-total-score">{`${this.getScore()}`}</h2>
        <h2
          data-testid="feedback-total-question"
        >
          {`${this.getAssertions()}`}
        </h2>
        <RedirectButton
          history={ history }
          name="Ver Ranking"
          testId="btn-ranking"
          url="/ranking"
        />
        <RedirectButton
          history={ history }
          name="Jogar novamente"
          testId="btn-play-again"
          url="/"
        />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  score: state.gameData.player.score,
});

Feedback.propTypes = {
  history: PropTypes.shape(PropTypes.object).isRequired,
  login: PropTypes.objectOf(PropTypes.object).isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
