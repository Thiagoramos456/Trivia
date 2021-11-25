import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score, gravatarImage } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatarImage }
          alt="Player Gravatar"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">{ score }</h2>
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
  score: state.login.score,
  gravatarImage: state.login.gravatarImage,
});

export default connect(mapStateToProps)(Header);
