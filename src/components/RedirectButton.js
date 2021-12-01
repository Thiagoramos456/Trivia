import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetGameData, resetState } from '../redux/actions';

class RedirectButton extends Component {
  constructor() {
    super();
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }

  goToNextQuestion(history) {
    const { url, reset, resetPlayer } = this.props;
    reset();
    resetPlayer();
    history.push(url);
  }

  render() {
    const { history, name, testId, className } = this.props;
    return (
      <button
        className={ className }
        type="button"
        data-testid={ testId }
        onClick={ () => this.goToNextQuestion(history) }
      >
        {name}
      </button>
    );
  }
}

RedirectButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  resetPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  reset: (state) => dispatch(resetState(state)),
  resetPlayer: (state) => dispatch(resetGameData(state)),
});

export default connect(null, mapDispatchToProps)(RedirectButton);
