import {
  INITIAL_HP,
  INITIAL_FOOD,
  INITIAL_INFECTION,
  INITIAL_DAY,
  INITIAL_HEAL_ATTEMPTS,
  INITIAL_RESCUE_POINTS,
  CARD_DATA,
  DAILY_FOOD_COST,
  DAILY_INFECTION_INCREASE,
  STARVATION_HP_PENALTY,
  MIN_STAT,
} from './constants.js';

export default class GameModel {
  constructor() {
    this.hp = INITIAL_HP;
    this.food = INITIAL_FOOD;
    this.infection = INITIAL_INFECTION;
    this.day = INITIAL_DAY;
    this.healAttempts = INITIAL_HEAL_ATTEMPTS;
    this.rescuePoints = INITIAL_RESCUE_POINTS;
    this.deck = this.generateDeck();
  }

  generateDeck() {
    const deck = [];
    for (const card of CARD_DATA) {
      for (let i = 0; i < card.count; i += 1) {
        deck.push(card);
      }
    }
    this.shuffleDeck(deck);
    return deck;
  }

  shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i -= 1) {
      // 0 ~ TOTAL_DECK_SIZE-1 사이의 랜덤 인덱스
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const tmp = deck[i];
      deck[i] = deck[randomIndex];
      deck[randomIndex] = tmp;
    }
  }

  drawCard() {
    // 덱이 비면 새로 생성
    if (this.deck.length === 0) {
      this.deck = this.generateDeck();
    }
    return this.deck.pop();
  }

  applyChoiceEffect(effect) {
    this.hp += effect.hp || 0;
    this.food += effect.food || 0;
    this.infection += effect.infection || 0;
    this.rescuePoints += effect.rescue || 0;
  }

  applyDailyCost() {
    this.food -= DAILY_FOOD_COST;
    this.infection += DAILY_INFECTION_INCREASE;
    if (this.food < MIN_STAT) {
      this.hp -= STARVATION_HP_PENALTY;
    }
  }
}
