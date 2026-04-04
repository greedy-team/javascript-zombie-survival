const state = {
    hp: 100,
    food: 3,
    infection: 10,
    day:1,
    healAttempts:0,
    rescuePoints:0,
    deck:[],
    currentCard:null,
    isGameOver: false,
};

const cardTemplates=[
    { 
        name: '🧟 생존자 시체', count: 4, 
        textA: '배낭째로 가져온다 (식량 +3, 감염도 +8)',
        textB: '겉에 있는 것만 집는다 (식량 +1)',
        actionA: { food: 3, infection: 8 }, 
        actionB: { food: 1 } },
    { 
    name: '💊 부상당한 군인', count: 4, 
    textA: '식량을 건네고 약을 받는다 (식량 -1, 감염도 -20)',
    textB: '몸싸움 끝에 식량만 챙기고 떠난다 (체력 -10, 식량 +2)',
    actionA: { food: -1, infection: -20 }, 
    actionB: { hp: -10, food: 2 } 
    },
    { 
    name: '🔪 임시 수술', count: 3, 
    textA: '감염 부위를 직접 도려낸다 (체력 -25, 감염도 -25)',
    textB: '이를 악물고 참는다 (체력 -5, 감염도 +10)',
    actionA: { hp: -25, infection: -25 }, 
    actionB: { hp: -5, infection: 10 } 
    },
    { 
    name: '🚗 군용 차량 행렬', count: 3, 
    textA: '뛰어나가 신호를 보낸다 (구조 포인트 +1, 감염도 +8)',
    textB: '몸을 낮추고 방향만 확인한다 (체력 +5)',
    actionA: { rescuePoints: 1, infection: 8 }, 
    actionB: { hp: 5 } 
    },
    { 
    name: '💧 오염된 웅덩이', count: 3, 
    textA: '그냥 마신다. 탈수보다 낫다 (체력 +5, 감염도 +15)',
    textB: '참는다. 빗물을 기다린다 (체력 -10)',
    actionA: { hp: 5, infection: 15 }, 
    actionB: { hp: -10 } 
    },
    { 
    name: '🚛 구조 트럭', count: 3, 
    textA: '전력으로 달려간다 (체력 -20, 구조 포인트 +1)',
    textB: '체력을 아끼고 쉰다 (체력 +10)',
    actionA: { hp: -20, rescuePoints: 1 }, 
    actionB: { hp: 10 } 
    },
];

export const model={
    createDeck(){
        state.deck=[];
        
        for (let i = 0; i < cardTemplates.length; i++) {
            const template = cardTemplates[i];

            for (let j = 0; j < template.count; j++) {
                state.deck.push({
                    name: template.name,
                    textA: template.textA,
                    textB: template.textB,
                    actionA: template.actionA,
                    actionB: template.actionB
                });
            }
        }
    },

    updateHungerPenalty(){
        if(state.food<=0) {
            state.hp = Math.max(0, state.hp - 10);
            return "배고픔 때문에 체력이 추가로 깎였습니다. (-10)";}
        return "";
    },

    updateSurvivalStats(effect){
        state.hp=Math.max(0, state.hp+(effect.hp||0));
        state.food=Math.max(0, state.food+(effect.food||0)-1);
        const passInfection=Math.max(0, state.infection+(effect.infection||0));
        state.infection = passInfection + 3;
    },
    
    updateGoalProgress(effect){
        state.rescuePoints+=(effect.rescuePoints||0);

        if (effect.infection < 0) state.healAttempts++;
    },

    calculateStats(type){
        const card=state.currentCard;
        let effect;
        let choiceText;

        if(type==='A') {
            effect=card.actionA;
            choiceText=card.textA;}
        else if(type==='B') {
            effect=card.actionB;
            choiceText=card.textB;}

        const hungryLog =this.updateHungerPenalty();
        this.updateSurvivalStats(effect);
        this.updateGoalProgress(effect);

        state.day++;

        return {choiceText,hungryLog};
    },

    shuffleDeck(){
        const {deck}=state;
        for(let i=deck.length-1;i>0;i--){
            let j= Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    },

    checkGameOver(){
        const{hp, infection, healAttempts,rescuePoints,day}=state;

        if (hp <= 0) return "사망";
        if (infection >= 100) return "좀비화";
        if (healAttempts >= 5) return "치료 성공";
        if (rescuePoints >= 3 && day > 10) return "구조 성공";
        if (day > 15) return "생존 성공";

        return null;
    },

    resetState() {
        state.hp = 100;
        state.food = 3;
        state.infection = 10;
        state.day = 1;
        state.healAttempts = 0;
        state.rescuePoints = 0;
        state.deck = [];
        state.currentCard = null;
        state.isGameOver = false;
    },

    drawCardDeck(){
        if(state.deck.length===0){
            this.createDeck();
            this.shuffleDeck();
        }
        state.currentCard=state.deck.pop();
        return state.currentCard;
    },

    getState(){
        return {...state};
    },

    setGameOver(status) {
        state.isGameOver = status;
    },
}