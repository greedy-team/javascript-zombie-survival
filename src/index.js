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
        deck:[],
        currentCard:null,
    },

    init(){
        this.createDeck();
        this.shuffleDeck();
        this.updateStats();
        this.bindEvents();
        this.changeScreen('draw')
    },

    bindEvents(){
        this.el.$buttons.btnDraw.onclick = () => this.handleDraw();
        this.el.$buttons.btnChoiceA.onclick = () => this.handleChoice('A');
        this.el.$buttons.btnChoiceB.onclick = () => this.handleChoice('B');
    },

    handleDraw(){
        if(this.state.deck.length===0){
            this.reshuffleDeck();
        }

        const card=this.state.deck.pop();
        this.state.currentCard=card;

        this.el.$displays.cardName.textContent=card.name;
        this.el.$displays.cardDescription.textContent="생존을 위한 선택을 내리십시오.";

        this.changeScreen('card');
        this.updateStats();
    },

    changeScreen(type){
        const drawArea=this.el.$screens.drawArea;
        const cardArea=this.el.$screens.cardArea;

        if(type==='draw'){
            drawArea.classList.remove('hidden');
            cardArea.classList.add('hidden');
        }else if(type==='card'){
            drawArea.classList.add('hidden');
            cardArea.classList.remove('hidden');
        }
    },

    handleChoice(type){

        this.el.$buttons.btnChoiceA.disabled=true;
        this.el.$buttons.btnChoiceB.disabled=true;

        setTimeout(()=>{
            this.calculateStats(type);
            this.updateStats();
            this.changeScreen('draw');

            this.el.$buttons.btnChoiceA.disabled=false;
            this.el.$buttons.btnChoiceB.disabled=false;

        },2000);
    },

    calculateStats(type){
        const card=this.state.currentCard;
        let effect;

        if(this.state.food<=0){
            this.state.hp-=10;
        }

        if(type==='A'){
            effect=card.actionA;
        }else if(type==='B'){
            effect=card.actionB;
        }

        this.state.hp+=(effect.hp||0);
        this.state.food+=(effect.food||0);
        this.state.infection+=(effect.infection||0);
        this.state.rescuePoints+=(effect.rescuePoints||0);

        this.state.day+=1;
        this.state.food-=1;
        this.state.infection+=3;
    },

    createDeck(){
        this.state.deck=[];
        const cardTemplates=[
            { name: '🧟 생존자 시체', count: 4, actionA: { food: 3, infection: 8 }, actionB: { food: 1 } },
            { name: '💊 부상당한 군인', count: 4, actionA: { food: -1, infection: -20 }, actionB: { hp: -10, food: 2 } },
            { name: '🔪 임시 수술', count: 3, actionA: { hp: -25, infection: -25 }, actionB: { hp: -5, infection: 10 } },
            { name: '🚗 군용 차량 행렬', count: 3, actionA: { rescuePoints: 1, infection: 8 }, actionB: { hp: 5 } },
            { name: '💧 오염된 웅덩이', count: 3, actionA: { hp: 5, infection: 15 }, actionB: { hp: -10 } },
            { name: '🚛 구조 트럭', count: 3, actionA: { hp: -20, rescuePoints: 1 }, actionB: { hp: 10 } },
        ];

        for (let i = 0; i < cardTemplates.length; i++) {
            const template = cardTemplates[i];

            for (let j = 0; j < template.count; j++) {
                this.state.deck.push({
                    name: template.name,
                    actionA: template.actionA,
                    actionB: template.actionB
                });
            }
        }
    },

    shuffleDeck(){
        const {deck}=this.state;
        for(let i=deck.length-1;i>0;i--){
            let j= Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    },

    updateStats(){ 
        this.el.$stats.hp.textContent = this.state.hp;
        this.el.$stats.food.textContent = this.state.food;
        this.el.$stats.infection.textContent = this.state.infection;
        this.el.$stats.day.textContent = this.state.day;
        this.el.$stats.healAttempts.textContent = this.state.healAttempts;
        this.el.$stats.rescuePoints.textContent = this.state.rescuePoints;
        this.el.$stats.deckRemaining.textContent=this.state.deck.length;
    },

    reshuffleDeck(){
        this.createDeck();
        this.shuffleDeck();
        this.updateStats();
    }
};

App.init();
