export default class Cards {
    constructor() {
        this.deck = [];
    }

    /**
     * 카드 초기화
     */
    initCard() {
        this.deck = Array.from({ length: 20 }, (_, i) => i + 1);
        this.remainCard = this.deck.length;
    }

    drawNewCard() {
        if (this.deck.length === 0) {
            this.initCard();  // 덱 리셋
        }

        // Math.random() 경계값(1)에 대한 방어 처리
        const randomIndex = Math.min(
            Math.floor(Math.random() * this.deck.length),
            this.deck.length - 1,
        );

        const [drawnCard] = this.deck.splice(randomIndex, 1);  // Remove and return in one step
        this.remainCard = this.deck.length;

        return drawnCard;
    }
}
