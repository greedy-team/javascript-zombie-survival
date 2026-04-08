function showChoiceScreen(cards) {
  document.querySelector('#draw-area').classList.add('hidden');
  document.querySelector('#btn-draw').classList.add('hidden');
  document.querySelector('#card-area').classList.remove('hidden');
  document.querySelector('.log-wrapper').classList.add('hidden');
  document.querySelector('#deck-remaining').innerHTML = cards.length;
}
function showTwoChoice(cardContent, cards) {
  showChoiceScreen(cards);
  const cardName = document.querySelector('#card-name');
  const cardDescription = document.querySelector('#card-description');
  const labelA = document.querySelector('#btn-choice-a .choice-label');
  const descA = document.querySelector('#btn-choice-a .choice-desc');
  const labelB = document.querySelector('#btn-choice-b .choice-label');
  const descB = document.querySelector('#btn-choice-b .choice-desc');

  cardName.innerHTML = cardContent.name;
  cardDescription.innerHTML = cardContent.desc;
  labelA.innerHTML = cardContent.choiceA;
  descA.innerHTML = cardContent.resultA;
  labelB.innerHTML = cardContent.choiceB;
  descB.innerHTML = cardContent.resultB;
}
function continueGame() {
  document.querySelector('#draw-area').classList.remove('hidden');
  document.querySelector('#btn-draw').classList.remove('hidden');
  document.querySelector('#card-area').classList.add('hidden');
  document.querySelector('.log-wrapper').classList.remove('hidden');
}

function showStates(player) {
  document.querySelector('#day').innerHTML = player.date;
  document.querySelector('#hp').innerHTML = player.hp;
  document.querySelector('#food').innerHTML = player.food;
  document.querySelector('#infection').innerHTML = player.infection;
  document.querySelector('#heal-attempts').innerHTML = player.heal;
  document.querySelector('#rescue-points').innerHTML = player.rescuePoint;
}
function showEnding(player, ending) {
  document.querySelector('#game-screen').classList.add('hidden');
  // document.querySelector("#card-area").classList.add("hidden");
  // document.querySelector("#btn-draw").disabled=true;
  document.querySelector('#result-screen').classList.remove('hidden');
  document.querySelector('#result-days').innerHTML = player.date - 1;
  document.querySelector('#result-hp').innerHTML = player.hp;
  document.querySelector('#result-food').innerHTML = player.food;
  document.querySelector('#result-infection').innerHTML = player.infection;
  document.querySelector('#result-ending').innerHTML = ending;
}
function restartScreen(cards) {
  // document.querySelector("#card-area").classList.remove("hidden");
  // document.querySelector("#btn-draw").disabled=false;
  document.querySelector('#game-screen').classList.remove('hidden');
  document.querySelector('#result-screen').classList.add('hidden');
  document.querySelector('#draw-area').classList.remove('hidden');
  document.querySelector('#card-area').classList.add('hidden');
  document.querySelector('#btn-draw').classList.remove('hidden');
  document.querySelector('#log').innerHTML = `<p></p>`;
  document.querySelector('#deck-remaining').innerHTML = cards.length;
}
function hideLoading() {
  document.querySelector('#loading').classList.add('hidden');
  document.querySelector('#btn-choice-a').disabled = false;
  document.querySelector('#btn-choice-b').disabled = false;
}
function showLoading() {
  document.querySelector('#btn-choice-a').disabled = true;
  document.querySelector('#btn-choice-b').disabled = true;
  document.querySelector('#loading').classList.remove('hidden');
}
export {
  showTwoChoice,
  continueGame,
  showStates,
  showEnding,
  restartScreen,
  hideLoading,
  showLoading,
};
