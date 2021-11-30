export default function createInitialLocalStorage(props) {
  const prevStoreInLS = localStorage.getItem('state');
  if (!prevStoreInLS) {
    const { login: { name, email: gravatarEmail } } = props;
    const { player } = props;

    const initialStateInLS = {
      player: {
        name,
        assertions: player.assertions,
        score: player.score,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(initialStateInLS));
  }
}

export function createRankingInLocalStore(login, score) {
  const prevRankingInLS = JSON.parse(localStorage.getItem('ranking'));
  const { name, gravatarImage } = login;
  const currentPlayer = {
    name,
    score,
    picture: gravatarImage,
  };

  if (!prevRankingInLS) {
    const initialRankingInLS = [currentPlayer];
    localStorage.setItem('ranking', JSON.stringify(initialRankingInLS));
  } else {
    const allPlayers = [...prevRankingInLS, currentPlayer];
    // const allPlayers = prevRankingInLS.push(currentPlayer);
    localStorage.setItem('ranking', JSON.stringify(allPlayers));
  }
}
