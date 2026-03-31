export default class InputCard {
    constructor() {
        this.initializeCardElements();
    }

    // HTML 요소 초기화
    initializeCardElements() {
        this.drawButton = document.getElementById('btn-draw');
    }

    bindDrawCard(handler) {
        this.drawButton.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        }
    );}
}