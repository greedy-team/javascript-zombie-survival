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

            console.log("카드 드로우 버튼 클릭됨");
            handler();
        }
    );}
}