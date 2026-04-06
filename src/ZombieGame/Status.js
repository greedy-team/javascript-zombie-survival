/**
 * @breif 스탯 클래스
 * 
 * 게임의 스탯을 관리하는 클래스
 * 체력, 식량, 감염도, 치료, 구조 포인트 등의 스탯을 초기화하고, getter/setter 메서드를 제공하여 스탯 값을 관리하는 역할을 수행
 * ZombieController에서 사용되며, 게임의 핵심 로직 중 하나인 스탯 시스템을 담당
 */
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