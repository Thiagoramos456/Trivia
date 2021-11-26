import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import RankingButton from '../components/RankingButton';

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
    const { history } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          {' '}
          {this.getFeedbackMessage()}
          {' '}
          <RankingButton history={ history } />
        </h2>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape(PropTypes.object).isRequired,
};
