import { model } from '../models/ZombieModel.js';

export const viewModel = {
    
    onStatsChange: null, 
    onLogAdd: null,     
    onScreenChange: null, 
    onGameOver: null,

    init() {
        const currentState=model.getState();
        if (this.onLogAdd) this.onLogAdd(currentState.day, "좀비 사태 발생! 생존하십시오.");
        model.createDeck();
        model.shuffleDeck();
        if (this.onStatsChange) this.onStatsChange(currentState);
        if (this.onScreenChange) this.onScreenChange('draw');
    }, 

    drawCard(){

        const card=model.drawCardDeck();
        const currentState=model.getState();

        if (this.onScreenChange) this.onScreenChange('card', card);
        if (this.onStatsChange) this.onStatsChange(currentState);

    },

    selectAction(type){
        
        this.startTurn();

        setTimeout(()=>{
            const state=model.getState();
            if(state.isGameOver)return;

            const updateState = this.processTurnResult(type);
            this.finalizeTurn(updateState);

        },2000);
    },

    startTurn(){
        if (this.onScreenChange) this.onScreenChange('loading');
    },
    
    processTurnResult(type){
        const results = model.calculateStats(type);
        const state = model.getState();

        if (results.hungryLog && this.onLogAdd) this.onLogAdd(state.day - 1, results.hungryLog);
        if (this.onLogAdd) this.onLogAdd(state.day - 1, results.choiceText);
        if (this.onStatsChange) this.onStatsChange(state);

        return state;
    },

    finalizeTurn(state){
        const endingText=model.checkGameOver();

        if(endingText){
            model.setGameOver(true);
            if (this.onGameOver) this.onGameOver(model.getState(), endingText);
        }else{
            if (this.onScreenChange) this.onScreenChange('draw');
        }
    },

    surrender() {
        model.setGameOver(true);
        const currentState=model.getState();
        if (this.onGameOver) this.onGameOver(currentState, "중도 포기하셨습니다.");
    },

    restartGame(){
        model.resetState();
        this.init();
    },
};
