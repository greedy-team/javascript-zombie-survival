import GameViewModel from "../viewModel/GameViewModel.js";

export default class GameView {
    constructor() {
        this.gameViewModel = new GameViewModel();
        this.drawButton = document.querySelector("#btn-draw");
        this.choices = document.querySelector("#choices");
        this.cardArea = document.querySelector("#card-area");
        this.aChoiceButton = document.querySelector("#btn-choice-a");
        this.bChoiceButton = document.querySelector("#btn-choice-b");
        this.cardName = document.querySelector("#card-name");
        this.cardDescription = document.querySelector("#card-description");
        this.state = document.querySelector(".stats");
        this.loading = document.querySelector("#loading");
        this.deckRemaining = document.querySelector("#deck-remaining");
        this.giveupButton = document.querySelector("#btn-giveup");
        this.resultScreen = document.querySelector("#result-screen");
        this.restartButton = document.querySelector("#btn-restart");
        this.log = document.querySelector("#log");
        this.logScreen = document.querySelector(".log-wrapper");
        this.resultEnding = document.querySelector("#result-ending");
        this.resultDays = document.querySelector("#result-days");
        this.resultHp = document.querySelector("#result-hp");
        this.resultFood = document.querySelector("#result-food");
        this.resultInfection = document.querySelector("#result-infection");
    }
    bindEvents() {
        this.bindDrawButton();
        this.bindAChoiceButton();
        this.bindBChoiceButton();
        this.bindGiveupButton();
        this.bindRestartButton();
    }

    bindDrawButton() {
        this.drawButton.addEventListener("click", () => {
            this.giveupButton.classList.add("hidden");
            this.drawButton.style.display = "none";
            this.cardArea.classList.remove("hidden");

            this.aChoiceButton.disabled = false;
            this.bChoiceButton.disabled = false;

            const card = this.gameViewModel.drawCard();
            this.updatePlayerState(card.playerState);

            this.deckRemaining.textContent = card.cardCount;
            this.cardName.textContent = card.name;
            this.cardDescription.textContent = card.description;
            this.aChoiceButton.querySelector(".choice-label").textContent = card.aDescription;
            this.aChoiceButton.querySelector(".choice-desc").textContent = card.aEffectDescription;

            this.bChoiceButton.querySelector(".choice-label").textContent = card.bDescription;
            this.bChoiceButton.querySelector(".choice-desc").textContent = card.bEffectDescription;
            this.addGeneralLog("카드를 뽑았습니다.");
        });
    }

    bindAChoiceButton() {
        this.aChoiceButton.addEventListener("click", () => {
            this.handleChoice(
                0,
                "A",
                this.aChoiceButton
            );
        });
    }

    bindBChoiceButton() {
        this.bChoiceButton.addEventListener("click", () => {
            this.handleChoice(
                1,
                "B",
                this.bChoiceButton
            );
        });
    }

    handleChoice(index, choiceName, choiceButton) {
        const result = this.gameViewModel.selectChoice(index);

        this.aChoiceButton.disabled = true;
        this.bChoiceButton.disabled = true;
        this.loading.classList.remove("hidden");
        this.cardArea.classList.add("hidden");

        this.addLog(
            this.cardName.textContent,
            choiceName,
            choiceButton.querySelector(".choice-desc").textContent
        );

        if (result.isStarvation) {
            this.addGeneralLog("식량이 없어");
        }

        setTimeout(() => {
            this.updatePlayerState(result.playerState);
            this.loading.classList.add("hidden");
            if (result.isPlaying) {
                this.drawButton.style.display = "";
                this.cardArea.classList.add("hidden");
                this.giveupButton.classList.remove("hidden");
                this.addGeneralLog(`선택지 ${choiceName}를 골랐습니다.`);
            }
            else {
                this.showGameOver(result.result, result.selectedDay);
            }
        }, 2000);
    }

    bindGiveupButton() {
        this.giveupButton.addEventListener("click", () => {
            const playerState =this.gameViewModel.getPlayerState();
            
            this.drawButton.style.display = "none";
            this.giveupButton.classList.add("hidden");
            this.resultScreen.classList.remove("hidden");

            this.logScreen.style.display = "none";

            this.showGameOver("포기",playerState.day);
        });
    }

    bindRestartButton() {
        this.restartButton.addEventListener("click", () => {
            this.logScreen.style.display = "";
            this.resultScreen.classList.add("hidden");
            this.restartButton.classList.add("hidden");
            this.giveupButton.classList.remove("hidden");
            this.drawButton.style.display = "";
            this.cardArea.classList.add("hidden");
            this.gameViewModel.initGame();
            this.updatePlayerState(this.gameViewModel.getPlayerState());
            this.deckRemaining.textContent = 20;
            this.log.innerHTML = "";
            this.addGeneralLog("게임을 시작했습니다.");
        });
    }

    updatePlayerState(playerState) {
        this.state.querySelector("#day").textContent = playerState.day;
        this.state.querySelector("#hp").textContent = playerState.hp;
        this.state.querySelector("#food").textContent = playerState.food;
        this.state.querySelector("#infection").textContent = playerState.infection;
        this.state.querySelector("#heal-attempts").textContent = playerState.treatmentCount;
        this.state.querySelector("#rescue-points").textContent = playerState.rescuePoint;
    }

    showGameOver(endingMessage, selectedDay) {
        this.resultScreen.classList.remove("hidden");
        this.restartButton.classList.remove("hidden");
        this.cardArea.classList.add("hidden");
        this.giveupButton.classList.add("hidden");
        this.logScreen.style.display = "none";

        const gameEnding = this.gameViewModel.isendGame();
        this.resultEnding.textContent = gameEnding.result;

        const playerState = this.gameViewModel.getPlayerState();

        this.resultEnding.textContent = endingMessage;
        this.resultDays.textContent = selectedDay;
        this.resultHp.textContent = playerState.hp;
        this.resultFood.textContent = playerState.food;
        this.resultInfection.textContent = playerState.infection;
    }

    addLog(cardName, choiceName, effectDescription) {
        const logItem = document.createElement("li");
        logItem.textContent = `${cardName} - 선택지 ${choiceName}: ${effectDescription}`;
        this.log.appendChild(logItem);
    }

    addGeneralLog(message) {
        const logItem = document.createElement("li");
        logItem.textContent = message;
        this.log.appendChild(logItem);
    }
}
