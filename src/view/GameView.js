class GameView {
  constructor() {
    this.elements = {
      day: document.getElementById('day'),
      hp: document.getElementById('hp'),
      food: document.getElementById('food'),
      infection: document.getElementById('infection'),
      deckRemaining: document.getElementById('deck-remaining'),
      cardArea: document.getElementById('card-area'),
      cardName: document.getElementById('card-name'),
      cardDescription: document.getElementById('card-description'),
      btnChoiceA: document.getElementById('btn-choice-a'),
      btnChoiceB: document.getElementById('btn-choice-b'),
      drawArea: document.getElementById('draw-area'),
      btnDraw: document.getElementById('btn-draw'),
      btnGiveup: document.getElementById('btn-giveup'),
      log: document.getElementById('log'),
      loading: document.getElementById('loading'),
      gameScreen: document.getElementById('game-screen'),
      resultScreen: document.getElementById('result-screen'),
      resultDays: document.getElementById('result-days'),
      resultHp: document.getElementById('result-hp'),
      resultFood: document.getElementById('result-food'),
      resultInfection: document.getElementById('result-infection'),
      resultEnding: document.getElementById('result-ending'),
    };
  }

  updateStats(state) {
    this.elements.day.textContent = state.day;
    this.elements.hp.textContent = state.hp;
    this.elements.food.textContent = state.food;
    this.elements.infection.textContent = state.infection;
  }

  updateDeckCount(count) {
    this.elements.deckRemaining.textContent = count;
  }

  showCard(card) {
    this.elements.cardName.textContent = card.name;
    this.elements.cardDescription.textContent = card.description;
    this.setChoiceButton(this.elements.btnChoiceA, card.choiceA);
    this.setChoiceButton(this.elements.btnChoiceB, card.choiceB);
    this.elements.cardArea.classList.remove('hidden');
    this.elements.drawArea.classList.add('hidden');
  }

  setChoiceButton(button, choice) {
    button.querySelector('.choice-label').textContent = choice.label;
    button.querySelector('.choice-desc').textContent = choice.desc;
  }

  hideCard() {
    this.elements.cardArea.classList.add('hidden');
    this.elements.drawArea.classList.remove('hidden');
  }

  addLog(message) {
    const entry = document.createElement('p');
    entry.textContent = message;
    this.elements.log.appendChild(entry);
    this.elements.log.scrollTop = this.elements.log.scrollHeight;
  }

  clearLog() {
    this.elements.log.innerHTML = '';
  }

  setChoicesDisabled(disabled) {
    this.elements.btnChoiceA.disabled = disabled;
    this.elements.btnChoiceB.disabled = disabled;
  }

  setDrawDisabled(disabled) {
    this.elements.btnDraw.disabled = disabled;
    this.elements.btnGiveup.disabled = disabled;
  }

  showLoading() {
    this.elements.loading.classList.remove('hidden');
  }

  hideLoading() {
    this.elements.loading.classList.add('hidden');
  }

  showGameScreen() {
    this.elements.gameScreen.classList.remove('hidden');
    this.elements.resultScreen.classList.add('hidden');
  }

  showGameOver(state) {
    this.elements.gameScreen.classList.add('hidden');
    this.elements.resultScreen.classList.remove('hidden');
    this.elements.resultDays.textContent = state.day;
    this.elements.resultHp.textContent = state.hp;
    this.elements.resultFood.textContent = state.food;
    this.elements.resultInfection.textContent = state.infection;
    this.elements.resultEnding.textContent = state.ending;
  }

  bindDrawButton(handler) {
    this.elements.btnDraw.addEventListener('click', handler);
  }

  bindChoiceA(handler) {
    this.elements.btnChoiceA.addEventListener('click', handler);
  }

  bindChoiceB(handler) {
    this.elements.btnChoiceB.addEventListener('click', handler);
  }

  bindGiveUpButton(handler) {
    this.elements.btnGiveup.addEventListener('click', handler);
  }

  bindRestartButton(handler) {
    document.getElementById('btn-restart').addEventListener('click', handler);
  }

  reset() {
    this.showGameScreen();
    this.clearLog();
    this.hideCard();
    this.hideLoading();
    this.setChoicesDisabled(false);
  }
}

export { GameView };
