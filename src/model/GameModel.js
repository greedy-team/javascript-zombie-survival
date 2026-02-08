import {
  INITIAL_STATE,
  CARDS,
  DECK_DISTRIBUTION,
  DAILY_FOOD_CONSUME,
  DAILY_INFECTION_INCREASE,
  STARVATION_DAMAGE,
} from '../constants/gameConstants.js';

class GameModel {
  constructor() {
    this.reset();
  }

  reset() {
    Object.assign(this, { ...INITIAL_STATE });
    this.isGameOver = false;
    this.ending = '';
    this.currentCard = null;
    this.deck = this.createDeck();
  }

  createDeck() {
    const deck = DECK_DISTRIBUTION.map((index) => ({ ...CARDS[index] }));
    return this.shuffleArray(deck);
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  drawCard() {
    if (this.deck.length === 0) this.deck = this.createDeck();
    this.currentCard = this.deck.pop();
    return this.currentCard;
  }

  getDeckCount() {
    return this.deck.length;
  }

  applyChoice(choiceKey) {
    const choice = this.currentCard[choiceKey];
    this.hp += choice.hp;
    this.food = Math.max(0, this.food + choice.food);
    this.infection += choice.infection;
    if (choice.isHeal) this.healAttempts += 1;
    if (choice.isRescue) this.rescuePoints += 1;
    return choice.label;
  }

  applyDailyEffects() {
    this.food = Math.max(0, this.food - DAILY_FOOD_CONSUME);
    this.infection += DAILY_INFECTION_INCREASE;
    if (this.food === 0) this.hp -= STARVATION_DAMAGE;
  }

  isStarving() {
    return this.food === 0;
  }

  checkEnding() {
    if (this.hp <= 0) return '사망';
    if (this.infection >= 100) return '좀비화';
    if (this.healAttempts >= 5) return '치료 성공';
    if (this.rescuePoints >= 3 && this.day > 10) return '구조 성공';
    if (this.day > 15) return '생존 성공';
    return null;
  }

  setGameOver(ending) {
    this.isGameOver = true;
    this.ending = ending;
  }

  incrementDay() {
    this.day += 1;
  }

  getState() {
    const { hp, food, infection, day, healAttempts, rescuePoints } = this;
    return { hp, food, infection, day, healAttempts, rescuePoints };
  }
}

export { GameModel };
