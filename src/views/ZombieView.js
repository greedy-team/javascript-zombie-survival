import { viewModel } from '../viewmodels/ZombieViewModel.js';

const el={
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
}

const updateStats = (state) => { 
    el.$stats.hp.textContent = state.hp;
    el.$stats.food.textContent = state.food;
    el.$stats.infection.textContent = state.infection;
    el.$stats.day.textContent = state.day;
    el.$stats.healAttempts.textContent = state.healAttempts;
    el.$stats.rescuePoints.textContent = state.rescuePoints;
    el.$stats.deckRemaining.textContent = state.deck.length;
};

export const addLog=(day, text)=>{
    const p = document.createElement('p'); 
    p.textContent = day ? `Day ${day}: ${text}` : text;
    el.$displays.log.appendChild(p);
}

export const changeScreen=(type, card=null)=>{

    const { gameScreen, drawArea, cardArea, resultScreen, loading } = el.$screens;


    if (type === 'result') {
        gameScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        return;
    }

    if (type === 'loading') {
        
        el.$buttons.btnChoiceA.disabled = true;
        el.$buttons.btnChoiceB.disabled = true;
        el.$buttons.btnDraw.disabled = true;
        el.$buttons.btnGiveup.disabled = true;
        return;
    }

    gameScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    drawArea.classList.add('hidden');
    cardArea.classList.add('hidden');
    loading.classList.add('hidden');

    el.$buttons.btnChoiceA.disabled = false;
    el.$buttons.btnChoiceB.disabled = false;
    el.$buttons.btnDraw.disabled = false;
    el.$buttons.btnGiveup.disabled = false;

    if (type === 'draw') {
        drawArea.classList.remove('hidden');
    } else if (type === 'card') {
        if (card) {
            el.$displays.cardName.textContent = card.name;
            el.$displays.cardDescription.textContent = "생존을 위한 선택을 내리십시오.";
            el.$buttons.btnChoiceA.querySelector('.choice-desc').textContent = card.textA;
            el.$buttons.btnChoiceB.querySelector('.choice-desc').textContent = card.textB;
        }
        cardArea.classList.remove('hidden');
    }
}

export const renderEnding=(state,text)=> {
    el.$displays.resultEnding.textContent=text;

    el.$displays.resultDays.textContent = state.day-1;
    el.$displays.resultHp.textContent = state.hp;
    el.$displays.resultFood.textContent = state.food;
    el.$displays.resultInfection.textContent = state.infection;

    changeScreen('result');
}

const clearLog=()=>{
    el.$displays.log.innerHTML='';
}

viewModel.onStatsChange = updateStats;
viewModel.onLogAdd = addLog;
viewModel.onScreenChange = changeScreen;
viewModel.onGameOver = renderEnding;

el.$buttons.btnDraw.onclick = () => viewModel.drawCard();
el.$buttons.btnChoiceA.onclick = () => viewModel.selectAction('A');
el.$buttons.btnChoiceB.onclick = () => viewModel.selectAction('B');
el.$buttons.btnGiveup.onclick = () => viewModel.surrender();
el.$buttons.btnRestart.onclick = () => {
    clearLog();
    viewModel.restartGame();
};
