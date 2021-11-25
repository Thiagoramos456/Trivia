import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import logo from '../trivia.png';
import '../App.css';
import { fetchApi, login as loginAction } from '../redux/actions';

class Login extends Component {
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

  async handleSubmit(event) {
    event.preventDefault();
    const { login, tokenToStore } = this.props;
    const { name, email } = this.state;
    login(name, email);
    const token = await tokenToStore(fetchApi);
    localStorage.setItem('token', JSON.stringify(token));
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
    const { logged } = this.props;
    return (
      <div className="App">
        {logged && <Redirect to="/game" />}
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
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
            <button
              type="submit"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleSubmit }
            >
              Jogar
            </button>
          </form>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  logged: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  tokenToStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  logged: state.login.logged,
});

const mapDispatchToProps = (dispatch) => ({
  login: (name, email) => dispatch(loginAction({ name, email })),
  tokenToStore: (token) => dispatch(fetchApi(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
