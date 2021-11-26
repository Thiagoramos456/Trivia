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

  const prevRankingInLS = localStorage.getItem('Ranking');
  if (!prevRankingInLS) {
    const { player, login: { name, gravatarImage } } = props;

    const initialRankingInLS = [{
      name,
      score: player.score,
      picture: gravatarImage,
    }];
    localStorage.setItem('ranking', JSON.stringify(initialRankingInLS));
  }
}
