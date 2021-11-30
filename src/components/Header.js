import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { name, score, gravatarImage } = this.props;
    return (
      // d-flex justify-content-around align-items-center py-3
      <header
        className="
        container d-flex
        justify-content-between
        align-items-center
        py-3
        "
      >
        <div className="d-flex flex-direction-row align-items-center">
          <img
            className="rounded-circle me-2"
            data-testid="header-profile-picture"
            src={ gravatarImage }
            alt="Player Gravatar"
          />
          <span className="navbar-text" data-testid="header-player-name">{ name }</span>
        </div>
        <span data-testid="navbar-text">{ `Score: ${score}` }</span>
        <Link className="navbar-brand text-danger h1" to="/">Sair</Link>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.gameData.player.score,
  gravatarImage: state.login.gravatarImage,
});

export default connect(mapStateToProps)(Header);
