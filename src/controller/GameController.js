import { ACTION_DELAY } from '../constants/gameConstants.js';

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.bindEvents();
    this.initializeView();
  }

  bindEvents() {
    this.view.bindDrawButton(() => this.handleDraw());
    this.view.bindChoiceA(() => this.handleChoice('choiceA'));
    this.view.bindChoiceB(() => this.handleChoice('choiceB'));
    this.view.bindGiveUpButton(() => this.handleGiveUp());
    this.view.bindRestartButton(() => this.handleRestart());
  }

  initializeView() {
    this.view.updateStats(this.model.getState());
    this.view.updateDeckCount(this.model.getDeckCount());
    this.view.addLog(
      '감염자의 이지선다가 시작되었습니다. 카드를 뽑아 생존하세요!',
    );
  }

  handleDraw() {
    if (this.model.isGameOver) return;
    const card = this.model.drawCard();
    this.view.showCard(card);
    this.view.updateDeckCount(this.model.getDeckCount());
    this.view.addLog(`Day ${this.model.day}: ${card.description}`);
  }

  handleChoice(choiceKey) {
    if (this.model.isGameOver) return;
    this.view.setChoicesDisabled(true);
    this.view.showLoading();

    setTimeout(() => {
      this.view.hideLoading();
      this.processTurn(choiceKey);
    }, ACTION_DELAY);
  }

  processTurn(choiceKey) {
    const label = this.model.applyChoice(choiceKey);
    this.view.addLog(`→ ${label}`);

    const starved = this.model.applyDailyEffects();
    if (starved) this.view.addLog('식량이 없어 체력이 감소합니다.');

    const ending = this.model.checkEnding();
    if (ending) return this.endGame(ending);

    this.model.incrementDay();
    this.view.updateStats(this.model.getState());
    this.view.hideCard();
    this.view.setChoicesDisabled(false);
    return undefined;
  }

  handleGiveUp() {
    if (this.model.isGameOver) return;
    this.endGame('포기');
  }

  endGame(ending) {
    this.model.setGameOver(ending);
    this.view.addLog(`=== 게임 종료: ${ending} ===`);
    this.view.showGameOver(this.model);
  }

  handleRestart() {
    this.model.reset();
    this.view.reset();
    this.view.updateStats(this.model.getState());
    this.view.updateDeckCount(this.model.getDeckCount());
    this.view.addLog(
      '감염자의 이지선다가 시작되었습니다. 카드를 뽑아 생존하세요!',
    );
  }
}

export { GameController };
