import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.handleRanking = this.handleRanking.bind(this);
    this.orderRanking = this.orderRanking.bind(this);
  }

  orderRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    if (ranking.length > 0) {
      ranking.sort((a, b) => b.score - a.score);
    }
    console.log(ranking);
    return ranking;
  }

  handleRanking(ranking) {
    return ranking.map((player, index) => (
      <li key={ index }>
        <span>
          <img
            data-testid={ `player-image-${index}` }
            src={ player.picture }
            alt={ player.name }
          />
        </span>
        <span data-testid={ `player-name-${index}` }>{player.name}</span>
        <span data-testid={ `player-score-${index}` }>{player.score}</span>
      </li>
    ));
  }

  render() {
    const state = this.orderRanking();
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>{this.handleRanking(state)}</ul>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Home
          </button>
        </Link>
      </>
    );
  }
}
export default connect()(Ranking);
