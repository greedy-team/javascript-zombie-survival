import { RESULT_DELAY_MS } from './constants.js';

export default class GameViewModel {
  constructor(model) {
    this.model = model;
    this.currentCard = null;
    this.listeners = [];
    this.state = 'draw'; // "draw", "choosing", "loading", "result"
  }

  // View가 구독
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // 알림 - 상태가 바뀔 때 실행
  notify() {
    this.listeners.forEach((callback) => callback());
  }

  // get — 값을 읽을 때 실행. 프로퍼티처럼 접근 가능
  get deckRemaining() {
    return this.model.deck.length;
  }

  handleDrawCard() {
    this.currentCard = this.model.drawCard();
    // 카드 뽑은 후 선택 단계로 이동
    this.state = 'choosing';
    this.notify();
  }

  handleChoice(choice) {
    const effect =
      choice === 'A'
        ? this.currentCard.choiceA.effect
        : this.currentCard.choiceB.effect;
    // 선택 효과 적용 후 결과 화면으로 이동
    this.state = 'loading';
    this.notify();
    setTimeout(() => {
      this.model.applyChoiceEffect(effect);
      this.model.applyDailyCost();
      this.state = 'draw';
      this.notify();
    }, RESULT_DELAY_MS);
  }
}
