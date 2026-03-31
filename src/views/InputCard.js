export default class InputCard {
    constructor() {
        this.initializeCardElements();
    }

    // HTML 요소 초기화
    initializeCardElements() {
        this.drawButton = document.getElementById('btn-draw');
        this.choiceButtonA = document.getElementById('btn-choice-a');
        this.choiceButtonB = document.getElementById('btn-choice-b');
        this.restartButton = document.getElementById('btn-restart');
    }

    bindDrawCard(handler) {
        this.drawButton.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}

    bindDrawChoiceA(handler) {
        this.choiceButtonA.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}
    
    bindDrawChoiceB(handler) {
        this.choiceButtonB.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}

    bindRestart(handler) {
        this.restartButton.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}
}