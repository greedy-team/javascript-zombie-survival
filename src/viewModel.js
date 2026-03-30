export class GameViewModel {
  constructor(model) {
    this.model = model;
    this.currentCard = null;
    this.listeners = [];
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
    this.notify();
  }

  handleChoice(choice) {
    const effect =
      choice === "A"
        ? this.currentCard.choiceA.effect
        : this.currentCard.choiceB.effect;
    this.model.applyChoiceEffect(effect);
    this.model.applyDailyCost();
    this.notify();
  }
}
