import { model,state } from '../models/ZombieModel.js';

export const viewModel = {
    
    onStatsChange: null, 
    onLogAdd: null,     
    onScreenChange: null, 
    onGameOver: null,

    init() {
        if (this.onLogAdd) this.onLogAdd(state.day, "좀비 사태 발생! 생존하십시오.");
        model.createDeck();
        model.shuffleDeck();
        if (this.onStatsChange) this.onStatsChange(state);
        if (this.onScreenChange) this.onScreenChange('draw');
    }, 

    drawCard(){
        if(state.deck.length===0){
            model.createDeck();
            model.shuffleDeck();
        }

        const card=state.deck.pop();
        state.currentCard=card;

        if (this.onScreenChange) this.onScreenChange('card', state.currentCard);
        if (this.onStatsChange) this.onStatsChange(state);

    },

    selectAction(type){

        if (this.onScreenChange) this.onScreenChange('loading');

        setTimeout(()=>{
            if(state.isGameOver)return;
            const results = model.calculateStats(type);

            if (results.hungryLog && this.onLogAdd) this.onLogAdd(state.day - 1, results.hungryLog);
            if (this.onLogAdd) this.onLogAdd(state.day - 1, results.choiceText);
            if (this.onStatsChange) this.onStatsChange(state);

            const endingText=model.checkGameOver();

            if(endingText){
                state.isGameOver = true;
                if (this.onGameOver) this.onGameOver(state, endingText);
            }else{
                if (this.onScreenChange) this.onScreenChange('draw');
            }
        },2000);
    },

    surrender() {
        state.isGameOver = true;
        if (this.onGameOver) this.onGameOver(state, "중도 포기하셨습니다.");
    },

    restartGame(){
        model.resetState();
        this.init();
    },
};
