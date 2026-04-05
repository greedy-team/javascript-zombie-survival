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
  DEATH_HP_THRESHOLD,
  ZOMBIE_INFECTION_THRESHOLD,
  CURE_HEAL_REQUIRED,
  RESCUE_POINTS_REQUIRED,
  RESCUE_DAY_REQUIRED,
  SURVIVAL_DAY_REQUIRED,
} from './constants.js';

export default class GameModel {
  constructor() {
    this.reset();
  }

  reset() {
    this.hp = INITIAL_HP;
    this.food = INITIAL_FOOD;
    this.infection = INITIAL_INFECTION;
    this.day = INITIAL_DAY;
    this.healAttempts = INITIAL_HEAL_ATTEMPTS;
    this.rescuePoints = INITIAL_RESCUE_POINTS;
    this.deck = GameModel.generateDeck();
  }

  static generateDeck() {
    const deck = [];
    CARD_DATA.forEach((card) => {
      for (let i = 0; i < card.count; i += 1) {
        deck.push(card);
      }
    });
    return GameModel.shuffleDeck(deck);
  }

  static shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const tmp = shuffled[i];
      shuffled[i] = shuffled[randomIndex];
      shuffled[randomIndex] = tmp;
    }
    return shuffled;
  }

  drawCard() {
    // 덱이 비면 새로 생성
    if (this.deck.length === 0) {
      this.deck = GameModel.generateDeck();
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
    const isStarving = this.food < MIN_STAT;
    if (isStarving) {
      this.hp -= STARVATION_HP_PENALTY;
    }
    this.clampStats();
    this.day += 1;
    return isStarving;
  }

  // 치료 선택 누적 횟수 증가 (치료 카드 선택 시)
  addHealAttempt(card, choice) {
    if (card.isChoiceCure && choice === 'A') {
      this.healAttempts += 1;
    }
  }

  clampStats() {
    this.hp = Math.max(this.hp, MIN_STAT);
    this.food = Math.max(this.food, MIN_STAT);
    this.infection = Math.max(this.infection, MIN_STAT);
  }

  getEndingType() {
    // 실패 엔딩 (성공보다 우선)
    if (this.hp <= DEATH_HP_THRESHOLD) return '사망';
    if (this.infection >= ZOMBIE_INFECTION_THRESHOLD) return '좀비화';
    // 성공 엔딩
    if (
      this.rescuePoints >= RESCUE_POINTS_REQUIRED &&
      this.day > RESCUE_DAY_REQUIRED
    )
      return '구조 성공';
    if (this.day > SURVIVAL_DAY_REQUIRED) return '생존 성공';
    if (this.healAttempts >= CURE_HEAL_REQUIRED) return '치료 성공';
    return null;
  }
}
