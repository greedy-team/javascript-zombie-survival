const App={
    el:{
        $screens: {
            gameScreen: document.getElementById('game-screen'),
            drawArea: document.getElementById('draw-area'),
            cardArea: document.getElementById('card-area'),
            loading: document.getElementById('loading'),
            resultScreen: document.getElementById('result-screen'),
        },

        $buttons: {
            btnDraw: document.getElementById('btn-draw'),
            btnChoiceA: document.getElementById('btn-choice-a'),
            btnChoiceB: document.getElementById('btn-choice-b'),
            btnGiveup: document.getElementById('btn-giveup'),
            btnRestart: document.getElementById('btn-restart'),
        },

        $displays: {
            cardName: document.getElementById('card-name'),
            cardDescription: document.getElementById('card-description'),
            log: document.getElementById('log'),
            resultEnding: document.getElementById('result-ending'),

            resultDays: document.getElementById('result-days'),
            resultHp: document.getElementById('result-hp'),
            resultFood: document.getElementById('result-food'),
            resultInfection: document.getElementById('result-infection'),
        },

        $stats: {
            day: document.getElementById('day'),
            hp: document.getElementById('hp'),
            food: document.getElementById('food'),
            infection: document.getElementById('infection'),
            healAttempts: document.getElementById('heal-attempts'),
            rescuePoints: document.getElementById('rescue-points'),
            deckRemaining: document.getElementById('deck-remaining'),
        },
    },

    state: {
        hp: 100,
        food: 3,
        infection: 10,
        day:1,
        healAttempts:0,
        rescuePoints:0,
        deck:20,
    },

    init(){
        this.updateStats();
    },

    updateStats(){
        this.el.$stats.hp.textContent = this.state.hp;
        this.el.$stats.food.textContent = this.state.food;
        this.el.$stats.infection.textContent = this.state.infection;
        this.el.$stats.day.textContent = this.state.day;
        this.el.$stats.healAttempts.textContent = this.state.healAttempts;
        this.el.$stats.rescuePoints.textContent = this.state.rescuePoints;
        this.el.$stats.deckRemaining.textContent=this.state.deck;
    }
};

App.init();
