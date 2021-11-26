import React, { Component } from 'react';
import Header from '../components/Header';

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
      </div>
    );
  }
}
