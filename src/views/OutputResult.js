export default class OutputResult {
    constructor() {
        this.gameScreen = document.getElementById('game-screen');

        // 결과 화면 요소
        this.resultScreen = document.getElementById('result-screen');
        this.resultEnding = document.getElementById('result-ending');
        this.resultDays = document.getElementById('result-days');
        this.resultHp = document.getElementById('result-hp');
        this.resultFood = document.getElementById('result-food');
        this.resultInfection = document.getElementById('result-infection');
    }

    /**
     * 게임 화면 표시
     */
    showGameScreen() {
        this.resultScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
    }

    /**
     * 게임 종료
     * 
     * @param {*} result 게임 결과 메시지
     * @param {*} status 종료 시 플레이어의 상태 정보 (hp, food, infection)
     */
    endGame(result, status) {
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        this.resultEnding.textContent = `${result}`;

        // 상태 정보 업데이트
        this.resultDays.textContent = status.getDay();
        this.resultHp.textContent = status.getHp();
        this.resultFood.textContent = status.getFood();
        this.resultInfection.textContent = status.getInfection();
    }
}