import { GameCards } from "../constants/GameCards.js";

export default class Deck {
    constructor() {
        this.gameCards = [];
        this.cardCount = 0;
        this.initCards();
    }

    initCards() {
        this.gameCards = [];
        this.createCards();
        this.shuffleCards();
        this.cardCount = this.gameCards.length;
    }

    createCards() {
        GameCards.forEach((card) => {
            for (let i = 1; i <= card.count; i++) {
                this.gameCards.push(card);
            }
        });
    }

    shuffleCards() {
        for (let i = this.gameCards.length - 1; i >= 0; i--) {
            const randomArray = Math.floor(Math.random() * (i + 1));
            [this.gameCards[i], this.gameCards[randomArray]]
                = [this.gameCards[randomArray], this.gameCards[i]];
        }
    }

    drawCard() {
        const card = this.gameCards[this.cardCount - 1];
        this.cardCount -= 1;

        return {
            card:card,
            cardCount:this.cardCount
        };
    }


}
