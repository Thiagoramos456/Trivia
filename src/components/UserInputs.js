import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class UserInputs extends Component {
  render() {
    const { name, handleChange, email } = this.props;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            id="name"
            type="text"
            name="name"
            value={ name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            id="name"
            type="text"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

UserInputs.propTypes = {
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
