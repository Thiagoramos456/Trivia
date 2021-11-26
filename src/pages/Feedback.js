import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  constructor() {
    super();

    this.getFeedbackMessage = this.getFeedbackMessage.bind(this);
  }

  getFeedbackMessage() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
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
      </div>
    );
  }
}
