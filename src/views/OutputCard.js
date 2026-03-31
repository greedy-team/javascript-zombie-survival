export default class OutputCard {
    constructor() {
        this.initializeStatElements();
    }

    // HTML 요소 초기화
    initializeStatElements() {
        this.cardContainer = document.getElementById('deck-remaining');

        this.cardArea = document.getElementById('card-area');
        this.drawArea = document.getElementById('draw-area');

        this.cardName = document.getElementById('card-name');

        this.choiceKeyA = document.querySelector('#btn-choice-a .choice-label');
        this.choiceKeyB = document.querySelector('#btn-choice-b .choice-label');

        this.glowAreaA = document.querySelector('#btn-choice-a .choice-desc');
        this.glowAreaB = document.querySelector('#btn-choice-b .choice-desc');

        this.giveUpBtn = document.getElementById('btn-giveup');
        this.logWrapper = document.getElementsByClassName('log-wrapper')[0];
    }

    showCardLeft(remainCard) {
        this.cardContainer.textContent = remainCard;
    }

    showChoice(selectedCard, choiceA, choiceB, benefitA, benefitB) {
        this.displayCardArea();
    
        this.cardName.textContent = selectedCard;

        this.choiceKeyA.textContent = choiceA;
        this.choiceKeyB.textContent = choiceB;

        this.glowAreaA.textContent = benefitA;
        this.glowAreaB.textContent = benefitB;
    }

    displayCardArea() {
        this.drawArea.classList.add('hidden');
        this.cardArea.classList.remove('hidden');

        this.giveUpBtn.classList.add('hidden');
        this.logWrapper.classList.add('hidden');
    }

    invaildButton() {
        this.choiceKeyA.parentElement.disabled = true;
        this.choiceKeyB.parentElement.disabled = true;
        
        setTimeout(() => {
            this.choiceKeyA.parentElement.disabled = false;
            this.choiceKeyB.parentElement.disabled = false;

            this.drawArea.classList.remove('hidden');
            this.cardArea.classList.add('hidden');

            this.giveUpBtn.classList.remove('hidden');
            this.logWrapper.classList.remove('hidden'); 
        }, 2000);
    }
}
