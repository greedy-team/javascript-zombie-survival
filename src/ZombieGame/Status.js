export default class Status {
    constructor(day, hp, food, infection, heal, rescue, healSelected) {
        this.day = day;
        this.hp = hp;
        this.food = food;
        this.infection = infection;
        this.heal = heal;
        this.rescue = rescue;
        this.healSelected = healSelected;
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
}