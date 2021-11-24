import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enableBtn = this.enableBtn.bind(this);
  }

  enableBtn() {
    const MIN_LENGTH = 0;
    const { email, name } = this.state;
    if (email.length > MIN_LENGTH && name.length > MIN_LENGTH) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.enableBtn(),
    );
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            id="name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
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
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" data-testid="btn-play" disabled={ isDisabled }>
          Jogar
        </button>
      </form>
    );
  }
}
