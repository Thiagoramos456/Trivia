import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Buttons extends Component {
  render() {
    const { disabled, testId, text, onClick } = this.props;
    return (
      <button
        disabled={ disabled }
        type="button"
        data-testid={ testId }
        onClick={ onClick !== null && onClick }
      >
        {text}
      </button>
    );
  }
}

Buttons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
