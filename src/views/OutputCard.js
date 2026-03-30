export default class OutputCard {
    constructor() {
        this.initializeStatElements();
    }

    // HTML 요소 초기화
    initializeStatElements() {
        this.cardContainer = document.getElementById('deck-remaining');
    }

    showCardLeft(remainCard) {
        this.cardContainer.textContent = remainCard;
    }
}
