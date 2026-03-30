import {
  INITIAL_HP,
  INITIAL_FOOD,
  INITIAL_INFECTION,
  INITIAL_DAY,
  INITIAL_HEAL_ATTEMPTS,
  INITIAL_RESCUE_POINTS,
} from "./constants.js";

export class GameModel {
  constructor() {
    this.hp = INITIAL_HP;
    this.food = INITIAL_FOOD;
    this.infection = INITIAL_INFECTION;
    this.day = INITIAL_DAY;
    this.healAttempts = INITIAL_HEAL_ATTEMPTS;
    this.rescuePoints = INITIAL_RESCUE_POINTS;
  }
}
