/**
 * @breif 상태 정보 출력과 관련된 HTML 요소를 관리하는 클래스
 * 
 * OutputStat 클래스는 상태 정보 출력과 관련된 HTML 요소를 관리
 * 각 요소에 대한 상태 업데이트를 담당
 */
export default class OutputStat {
    constructor() {
        this.statDay = document.getElementById('day');
        this.statHp = document.getElementById('hp');
        this.statFood = document.getElementById('food');
        this.statInfection = document.getElementById('infection');
        this.statHeal = document.getElementById('heal-attempts');
        this.statRescue = document.getElementById('rescue-points');
    }

    /**
     * 상태 정보를 받아 화면에 표시
     * 
     * @param {*} day 현재 날짜
     * @param {*} hp HP 값
     * @param {*} food 음식 값
     * @param {*} infection 감염 상태
     * @param {*} heal 치료 시도 횟수
     * @param {*} rescue 구조 점수
     */
    showStat(day, hp, food, infection, heal, rescue) {
        this.statDay.textContent = day;
        this.statHp.textContent = hp;
        this.statFood.textContent = food;
        this.statInfection.textContent = infection;
        this.statHeal.textContent = heal;
        this.statRescue.textContent = rescue;
    }
}