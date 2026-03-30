export class GameView {
  constructor(viewModel) {
    this.vm = viewModel;
    this.initElements();
  }

  initElements() {
    this.gameScreen = document.querySelector('#game-screen');
    this.resultScreen = document.querySelector('#result-screen');

    this.day = document.querySelector('#day');
    this.hp = document.querySelector('#hp');
    this.food = document.querySelector('#food');
    this.infection = document.querySelector('#infection');
    this.healAttempts = document.querySelector('#heal-attempts');
    this.rescuePoints = document.querySelector('#rescue-points');

    this.drawArea = document.querySelector('#draw-area');
    this.btnDraw = document.querySelector('#btn-draw');
    this.deckRemaining = document.querySelector('#deck-remaining');

    this.cardArea = document.querySelector('#card-area');
    this.cardName = document.querySelector('#card-name');
    this.cardDescription = document.querySelector('#card-description');
    this.btnChoiceA = document.querySelector('#btn-choice-a');
    this.btnChoiceB = document.querySelector('#btn-choice-b');

    this.loading = document.querySelector('#loading');
    this.btnGiveup = document.querySelector('#btn-giveup');
    this.log = document.querySelector('#log');

    this.resultEnding = document.querySelector('#result-ending');
    this.resultDays = document.querySelector('#result-days');
    this.resultHp = document.querySelector('#result-hp');
    this.resultFood = document.querySelector('#result-food');
    this.resultInfection = document.querySelector('#result-infection');
    this.btnRestart = document.querySelector('#btn-restart');
  }
}
