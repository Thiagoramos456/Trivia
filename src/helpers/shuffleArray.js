export default function shuffle(array) {
  const SORT_VALUE = 0.5;
  return array.sort(() => Math.random() - SORT_VALUE);
}

// Referência da função de randomização do array = https://javascript.info/task/shuffle
