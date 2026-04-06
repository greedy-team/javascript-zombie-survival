export default class OutputResult {
    constructor() {
        // 결과 화면 요소
        this.resultScreen = document.getElementById('result-screen');
        this.resultHp = document.getElementById('result-hp');
        this.resultFood = document.getElementById('result-food');
        this.resultInfection = document.getElementById('result-infection');
    }

    /**
     * 게임 종료
     * 
     * @param {*} result 게임 결과 메시지
     * @param {*} status 종료 시 플레이어의 상태 정보 (hp, food, infection)
     */
    endGame(result, status) {
        this.isGameOver = true;

        // 결과 화면 표시
        this.resultScreen.classList.remove('hidden');
        this.resultScreen.querySelector('p').textContent = `${result}`;

        // 상태 정보 업데이트
        this.resultHp.textContent = status.getHp();
        this.resultFood.textContent = status.getFood();
        this.resultInfection.textContent = status.getInfection();

        // 선택지 버튼 비활성화
        this.drawArea.classList.add('hidden');
        this.cardArea.classList.add('hidden');
        this.giveUpBtn.classList.add('hidden');
        this.logWrapper.classList.add('hidden');
    }
}