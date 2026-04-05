export default class Status {
    constructor() {
    }

    // 게임 시작 시 초기 스탯 설정
    initStat() {
        this.day = 1;
        this.hp = 100;
        this.food = 3;
        this.infection = 10;
        this.heal = 0;
        this.rescue = 0;
        this.healSelected = 0;
    }

    getDay() {
        return this.day;
    }
    setDay(value) {
        this.day = value;
    }

    getHp() {
        return this.hp;
    }
    setHp(value) {
        this.hp = value;
    }

    getFood() {
        return this.food;
    }
    setFood(value) {
        this.food = value;
    }

    getInfection() {
        return this.infection;
    }
    setInfection(value) {
        this.infection = value;
    }

    getHeal() {
        return this.heal;
    }
    setHeal(value) {
        this.heal = value;
    }

    getRescue() {
        return this.rescue;
    }
    setRescue(value) {
        this.rescue = value;
    }

    getHealSelected() {
        return this.healSelected;
    }
    setHealSelected(value) {
        this.healSelected = value;
    }
}