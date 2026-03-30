export default class OutputStat {
    constructor() {
        this.initializeStatElements();
    }

    // HTML 요소 초기화
    initializeStatElements() {
        this.statDay = document.getElementById('day');
        this.statHp = document.getElementById('hp');
        this.statFood = document.getElementById('food');
        this.statInfection = document.getElementById('infection');
        this.statHeal = document.getElementById('heal-attempts');
        this.statRescue = document.getElementById('rescue-points');
    }

    // Status의 스택 정보를 받아 화면에 표시
    showStat(day, hp, food, infection, heal, rescue) {
        this.statDay.textContent = day;
        this.statHp.textContent = hp;
        this.statFood.textContent = food;
        this.statInfection.textContent = infection;
        this.statHeal.textContent = heal;
        this.statRescue.textContent = rescue;
    }
}