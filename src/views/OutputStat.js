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
     */
    showStatus(status) {
        this.statDay.textContent = status.getDay();
        this.statHp.textContent = status.getHp();
        this.statFood.textContent = status.getFood();
        this.statInfection.textContent = status.getInfection();
        this.statHeal.textContent = status.getHeal();
        this.statRescue.textContent = status.getRescue();
    }
}