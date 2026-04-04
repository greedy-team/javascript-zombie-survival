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

        if (this.onScreenChange) this.onScreenChange('loading');

        setTimeout(()=>{
            const currentState=model.getState();
            if(currentState.isGameOver)return;

            const results = model.calculateStats(type);
            const updatedState=model.getState();

            if (results.hungryLog && this.onLogAdd) this.onLogAdd(updatedState.day - 1, results.hungryLog);
            if (this.onLogAdd) this.onLogAdd(updatedState.day - 1, results.choiceText);
            if (this.onStatsChange) this.onStatsChange(currentState);

            const endingText=model.checkGameOver();

            if(endingText){
                updatedState.isGameOver = true;
                if (this.onGameOver) this.onGameOver(currentState, endingText);
            }else{
                if (this.onScreenChange) this.onScreenChange('draw');
            }
        },2000);
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
