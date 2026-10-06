import Deck from "../model/Deck.js"
import Player from "../model/Player.js";

export default class GameViewModel {
    constructor() {
        this.deck = new Deck();
        this.player = new Player();
        this.card = null;
    }
    drawCard() {
        const getCard = this.deck.drawCard();
        this.card = getCard.card;
        return {
            name: this.card.name,
            description: this.card.description,
            aDescription: this.card.choice[0].description,
            aEffectDescription: this.card.choice[0].effectDescription,
            bDescription: this.card.choice[1].description,
            bEffectDescription: this.card.choice[1].effectDescription,
            cardCount: getCard.cardCount,
            playerState: this.player.getPlayerState()
        };
    }

    selectChoice(index) {
    const selectedDay = this.player.getPlayerState().day;

    this.player.applyEffect(
        this.card.choice[index].effect
    );

    let gameState = this.checkGameStatus();

    if (!gameState.isPlaying) {
        return {
            isPlaying: false,
            result: gameState.result,
            playerState: this.player.getPlayerState(),
            isStarvation: false,
            selectedDay,
        };
    }

    const isStarvation = this.player.dayEffect();

    gameState = this.checkGameStatus();

    return {
        isPlaying: gameState.isPlaying,
        result: gameState.result,
        playerState: this.player.getPlayerState(),
        isStarvation,
        selectedDay,
    };
}

    getPlayerState() {
        return this.player.getPlayerState();
    }

    isendGame() {
        const gameOver = this.player.isGameOver();

        if (gameOver.isOver) {
            return {
                gameStatus: false,
                result: gameOver.result
            };
        }
        else {
            return {
                gameStatus: true
            };
        }
    }

    initGame() {
        this.player.initGame();
        this.deck.initCards();
        return {
            playerState: this.player.getPlayerState()
        };
    }

    checkGameStatus() {
    const gameOver = this.player.isGameOver();

    if (gameOver.isOver) {
        return {
            isPlaying: false,
            result: gameOver.result
        };
    }

    return {
        isPlaying: true
    };
}

}
