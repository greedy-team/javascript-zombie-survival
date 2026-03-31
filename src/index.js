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
        isGameOver: false,
    },

    init(){
        this.addLog("좀비 사태가 발생했습니다. 생존을 시작합니다.");
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

        this.el.$buttons.btnGiveup.onclick=()=> this.finishGame("포기");

        this.el.$buttons.btnRestart.onclick=()=>this.restartGame();
    },

    handleDraw(){
        if(this.state.deck.length===0){
            this.reshuffleDeck();
        }

        const card=this.state.deck.pop();
        this.state.currentCard=card;

        this.el.$displays.cardName.textContent=card.name;
        this.el.$displays.cardDescription.textContent="생존을 위한 선택을 내리십시오.";

        this.el.$buttons.btnChoiceA.querySelector('.choice-desc').textContent = card.textA;
        this.el.$buttons.btnChoiceB.querySelector('.choice-desc').textContent = card.textB;

        this.changeScreen('card');
        this.updateStats();
    },

    changeScreen(type){
        const { gameScreen, drawArea, cardArea, resultScreen, loading } = this.el.$screens;

        if (type === 'result') {
            gameScreen.classList.add('hidden');
            resultScreen.classList.remove('hidden');
            return;
        }

        gameScreen.classList.remove('hidden');
        resultScreen.classList.add('hidden');
        drawArea.classList.add('hidden');
        cardArea.classList.add('hidden');
        loading.classList.add('hidden');

        if (type === 'draw') {
            drawArea.classList.remove('hidden');
        } else if (type === 'card') {
            cardArea.classList.remove('hidden');
        } else if (type === 'loading') {
            loading.classList.remove('hidden');
        }
    },

    handleChoice(type){

        this.el.$buttons.btnChoiceA.disabled=true;
        this.el.$buttons.btnChoiceB.disabled=true;

        this.changeScreen('loading');

        setTimeout(()=>{
            if(this.state.isGameOver)return;

            this.calculateStats(type);
            this.updateStats();

            const endingText=this.checkGameOver();

            if(endingText){
                this.finishGame(endingText);
            }else{
                this.changeScreen('draw');

                this.el.$buttons.btnChoiceA.disabled=false;
                this.el.$buttons.btnChoiceB.disabled=false;
            }
        },2000);
    },

    calculateStats(type){
        const card=this.state.currentCard;
        let effect;
        let choiceText;

        if(this.state.food<=0) {
            this.state.hp-=10;
            this.addLog("배고픔 때문에 체력이 추가로 깎였습니다. (-10)");}
        
        if(type==='A') {
            effect=card.actionA;
            choiceText=card.textA;}
        else if(type==='B') {
            effect=card.actionB;
            choiceText=card.textB;}

        this.addLog(`${choiceText}`);

        this.state.hp=Math.max(0, this.state.hp+(effect.hp||0));
        this.state.food=Math.max(0, this.state.food+(effect.food||0)-1);
        this.state.infection=Math.max(0, this.state.infection+(effect.infection||0)+3);
        this.state.rescuePoints+=(effect.rescuePoints||0);

        if (effect.infection < 0) this.state.healAttempts++;

        this.state.day++;
    },

    createDeck(){
        this.state.deck=[];
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

        for (let i = 0; i < cardTemplates.length; i++) {
            const template = cardTemplates[i];

            for (let j = 0; j < template.count; j++) {
                this.state.deck.push({
                    name: template.name,
                    textA: template.textA,
                    textB: template.textB,
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
    },

    addLog(text){
        const logText = `<div>Day${this.state.day}: ${text}</div><br>`

        this.el.$displays.log.innerHTML = logText + this.el.$displays.log.innerHTML;
    },

    checkGameOver(){
        const{hp, infection, healAttempts,rescuePoints,day}=this.state;

        if (hp <= 0) return "사망: 결국 체력이 다해 쓰러졌습니다.";
        if (infection >= 100) return "좀비화: 몸이 차갑게 식어갑니다. 당신은 더 이상 사람이 아닙니다.";
        if (healAttempts >= 5) return "치료 성공: 끈질긴 노력 끝에 바이러스 억제에 성공했습니다!";
        if (rescuePoints >= 3 && day > 10) return "구조 성공: 저 멀리 구조 헬기의 소리가 들립니다!";
        if (day >= 15) return "생존 성공: 15일간의 지옥 같은 시간을 견뎌냈습니다!";
    
        return null;

    },

    finishGame(text){
        this.state.isGameOver = true;

        this.el.$displays.resultEnding.textContent=text;
        this.el.$displays.resultDays.textContent = this.state.day;
        this.el.$displays.resultHp.textContent = this.state.hp;
        this.el.$displays.resultFood.textContent = this.state.food;
        this.el.$displays.resultInfection.textContent = this.state.infection;

        this.changeScreen('result');
    },

    restartGame(){
        this.state={
            hp: 100,
            food: 3,
            infection: 10,
            day:1,
            healAttempts:0,
            rescuePoints:0,
            deck:[],
            currentCard:null,
            isGameOver:false,
        };
        this.el.$displays.log.innerHTML = "";
        this.el.$buttons.btnChoiceA.disabled = false;
        this.el.$buttons.btnChoiceB.disabled = false;

        this.init();
    }
};

App.init();
