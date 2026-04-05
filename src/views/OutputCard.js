/**
 * @breif 카드에 관한 사용자 출력과 관련된 HTML 요소를 관리하는 클래스
 * 
 * OutputCard 클래스는 사용자 출력과 관련된 HTML 요소를 관리
 * 각 요소에 대한 상태 업데이트를 담당
 */
export default class OutputCard {
    constructor() {
        this.isGameOver = false;
        this.initializeStatElements();
    }

    /**
     * HTML 요소 초기화
     */
    initializeStatElements() {
        // 카드 영역 요소
        this.cardContainer = document.getElementById('deck-remaining');
        this.drawArea = document.getElementById('draw-area');
        this.cardArea = document.getElementById('card-area');
        this.cardName = document.getElementById('card-name');

        // 선택지 버튼 요소
        this.choiceKeyA = document.querySelector('#btn-choice-a .choice-label');
        this.choiceKeyB = document.querySelector('#btn-choice-b .choice-label');
        this.glowAreaA = document.querySelector('#btn-choice-a .choice-desc');
        this.glowAreaB = document.querySelector('#btn-choice-b .choice-desc');

        // 로그 및 포기 버튼 요소
        this.giveUpBtn = document.getElementById('btn-giveup');
        this.logWrapper = document.getElementsByClassName('log-wrapper')[0];

        // 결과 화면 요소
        this.resultScreen = document.getElementById('result-screen');
        this.resultHp = document.getElementById('result-hp');
        this.resultFood = document.getElementById('result-food');
        this.resultInfection = document.getElementById('result-infection');
    }

    /**
     * 요소 초기화
     */
    init() {
        this.drawArea.classList.remove('hidden');
        this.cardArea.classList.add('hidden');

        this.giveUpBtn.classList.remove('hidden');
        this.logWrapper.classList.remove('hidden'); 
    }

    /**
     * 남은 카드 수 표시
     * 
     * @param {*} remainCard 남은 카드 수
     */
    showCardLeft(remainCard) {
        this.cardContainer.textContent = remainCard;
    }

    /**
     * 선택지 표시
     * 
     * @param {*} selectedCard 선택된 카드 이름
     * @param {*} choiceA 선택지 A 텍스트
     * @param {*} choiceB 선택지 B 텍스트
     * @param {*} benefitA 선택지 A의 효과 텍스트
     * @param {*} benefitB 선택지 B의 효과 텍스트
     */
    showChoice(selectedCard, choiceA, choiceB, benefitA, benefitB) {
        this.isGameOver = false;
        this.displayCardArea();
        
        // 카드 이름 업데이트
        this.cardName.textContent = selectedCard;

        // 선택지 버튼 텍스트 업데이트
        this.choiceKeyA.textContent = choiceA;
        this.choiceKeyB.textContent = choiceB;
        this.glowAreaA.textContent = benefitA;
        this.glowAreaB.textContent = benefitB;
    }

    /**
     * 카드 영역 표시
     */
    displayCardArea() {
        this.drawArea.classList.add('hidden');
        this.giveUpBtn.classList.add('hidden');
        this.logWrapper.classList.add('hidden');

        this.cardArea.classList.remove('hidden');
    }

    /**
     * 선택지 버튼 비활성화 및 카드 영역 초기화
     */
    invalidButton() {
        // 게임이 종료된 경우 버튼 비활성화 및 카드 영역 초기화 방지
        if (this.isGameOver) {
            return;
        }

        // 선택지 버튼 비활성화
        this.choiceKeyA.parentElement.disabled = true;
        this.choiceKeyB.parentElement.disabled = true;
        
        setTimeout(() => {
            // 선택지 버튼 활성화
            this.choiceKeyA.parentElement.disabled = false;
            this.choiceKeyB.parentElement.disabled = false;

            this.cardArea.classList.add('hidden');

            this.drawArea.classList.remove('hidden');
            this.giveUpBtn.classList.remove('hidden');
            this.logWrapper.classList.remove('hidden'); 
        }, 2000);
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
        this.resultHp.textContent = status.hp;
        this.resultFood.textContent = status.food;
        this.resultInfection.textContent = status.infection;

        // 선택지 버튼 비활성화
        this.drawArea.classList.add('hidden');
        this.cardArea.classList.add('hidden');
        this.giveUpBtn.classList.add('hidden');
        this.logWrapper.classList.add('hidden');
    }
}
