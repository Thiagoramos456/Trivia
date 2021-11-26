import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class RankingButton extends Component {
  goToNextQuestion(history) {
    console.log(history);
    history.push('/ranking');
  }

  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ () => this.goToNextQuestion(history) }
      >
        Ver Ranking
      </button>
    );
  }
}

RankingButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(RankingButton);
