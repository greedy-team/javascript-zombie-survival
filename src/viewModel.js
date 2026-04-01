import { RESULT_DELAY_MS, GAME_STATE } from './constants.js';

export default class GameViewModel {
  constructor(model) {
    this.model = model;
    this.currentCard = null;
    this.listeners = [];
    this.state = GAME_STATE.DRAW;
    this.ending = null;
    this.log = [];
  }

  // View가 구독
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // 알림 - 상태가 바뀔 때 실행
  notify() {
    this.listeners.forEach((callback) => callback());
  }

  get stats() {
    return {
      day: this.model.day,
      hp: this.model.hp,
      food: this.model.food,
      infection: this.model.infection,
      healAttempts: this.model.healAttempts,
      rescuePoints: this.model.rescuePoints,
    };
  }

  get deckRemaining() {
    return this.model.deck.length;
  }

  handleDrawCard() {
    this.currentCard = this.model.drawCard();
    // 카드 뽑은 후 선택 단계로 이동
    this.state = GAME_STATE.CHOOSING;
    this.notify();
  }

  handleChoice(choice) {
    const selected =
      choice === 'A' ? this.currentCard.choiceA : this.currentCard.choiceB;
    this.state = GAME_STATE.LOADING;
    this.notify();
    this.applyEffectAfterChoice(selected.effect, selected.label, choice);
  }

  applyEffectAfterChoice(effect, label, choice) {
    setTimeout(() => {
      this.model.applyChoiceEffect(effect);
      this.model.addHealAttempt(this.currentCard, choice);
      const isStarving = this.model.applyDailyCost();
      this.addLog(`[Day ${this.model.day - 1}] ${this.currentCard.name}`);
      this.addLog(`선택: ${label}`);
      if (isStarving) {
        this.addLog('식량이 없어 체력이 감소합니다.');
      }
      const ending = this.model.getEndingType();
      if (ending) {
        this.ending = ending;
        this.state = GAME_STATE.RESULT;
      } else {
        this.state = GAME_STATE.DRAW;
      }
      this.notify();
    }, RESULT_DELAY_MS);
  }

  handleGiveUp() {
    if (this.state === GAME_STATE.LOADING) return;
    this.ending = '포기';
    this.state = GAME_STATE.RESULT;
    this.notify();
  }

  handleRestart() {
    if (this.state === GAME_STATE.LOADING) return;
    this.model.reset();
    this.currentCard = null;
    this.ending = null;
    this.log = [];
    this.state = GAME_STATE.DRAW;
    this.notify();
  }

  addLog(message) {
    this.log.push(message);
  }
}
