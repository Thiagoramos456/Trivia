import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import RedirectButton from '../components/RedirectButton';

export default class Feedback extends Component {
  constructor() {
    super();

    this.getFeedbackMessage = this.getFeedbackMessage.bind(this);
    this.getScore = this.getScore.bind(this);
    this.getAssertions = this.getAssertions.bind(this);
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
        <Header />
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

Feedback.propTypes = {
  history: PropTypes.shape(PropTypes.object).isRequired,
};
