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
        if(this.remainCard === 0) {
            this.initCard();  // 덱 리셋
        }
        
        const randomIndex = Math.floor(Math.random() * this.deck.length);
        const drawnCard = this.deck[randomIndex];
        this.deck.splice(randomIndex, 1);  // 뽑은 카드 제거
        this.remainCard = this.deck.length;
        
        return drawnCard;
    }
}